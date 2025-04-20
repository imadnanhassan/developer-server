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

export const ClientLogoController = {
  addClientLogo,
  getAllClientLogos,
};
