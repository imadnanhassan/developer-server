import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { PortfolioSchema } from "./caseStudies.validation";
import { caseStudiesService } from "./caseStudies.server";

const addProtfolio = catchAsync(async (req: Request, res: Response) => {
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
  const validatedData = PortfolioSchema.parse({
    ...req.body,
    image: cloudinaryResult.secure_url,
  });

  const newPortfolio = await caseStudiesService.addCaseStudies(validatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Portfolio added successfully",
    data: newPortfolio,
  });
});

export const caseStudiesController = {
  addProtfolio,
};
