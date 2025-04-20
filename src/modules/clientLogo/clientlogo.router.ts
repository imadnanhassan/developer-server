import express from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { ClientLogoController } from "./clientlogo.controller";
const router = express.Router();

router.post("/add", upload.single("image"), ClientLogoController.addClientLogo);
router.get("/", ClientLogoController.getAllClientLogos);

export const ClientLogoRouter = router;
