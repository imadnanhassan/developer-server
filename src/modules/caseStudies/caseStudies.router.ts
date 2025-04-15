import express from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { caseStudiesController } from "./caseStudies.controller";

const router = express.Router();

router.post("/add", upload.single("image"), caseStudiesController.addProtfolio);


export const PortfolioRoutes = router;