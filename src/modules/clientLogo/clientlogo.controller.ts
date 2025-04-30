import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { ClientLogoSchema } from "./clientlogo.validation";
import { ClientLogoService } from "./clientlogo.service";

const addClientLogo = catchAsync(async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "No image file uploaded",
      data: null,
    });
  }

  const cloudinaryResult = await sendImageToCloudinary(
    file.filename,
    file.path
  );
  const validatedData = ClientLogoSchema.parse({
    ...req.body,
    image: cloudinaryResult.secure_url || "", // Ensure image is always a string
  });

  const newPortfolio = await ClientLogoService.clientLogoInDB(validatedData );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Portfolio added successfully",
    data: newPortfolio,
  });
});

const getAllClientLogos = catchAsync(async (req: Request, res: Response) => {
  const logos = await ClientLogoService.getAllClientLogosInDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client logos retrieved successfully",
    data: logos,
  });
});

const getSingleClientLogo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const logo = await ClientLogoService.getSingleClientLogoInDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client logo retrieved successfully",
    data: logo,
  });
});

const updateClientLogo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file;
  let imageUrl = undefined;

  if (file) {
    const cloudinaryResult = await sendImageToCloudinary(
      file.filename,
      file.path
    );
    imageUrl = cloudinaryResult.secure_url || ""; // Ensure image is always a string
  }

  const validatedData = ClientLogoSchema.parse({
    ...req.body,
    ...(imageUrl && { image: imageUrl }), // Only include image if it exists
  });

  const updatedLogo = await ClientLogoService.updateClientLogoInDB(id, validatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client logo updated successfully",
    data: updatedLogo,
  });
});
const deleteClientLogo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const logo = await ClientLogoService.getSingleClientLogoInDB(id);
  if (!logo) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Client logo not found",
      data: null,
    });
  }
  await logo.deleteOne();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client logo deleted successfully",
    data: null,
  });
}
);

export const ClientLogoController = {
  addClientLogo,
  getAllClientLogos,
  getSingleClientLogo,
  updateClientLogo,
  deleteClientLogo,
};
