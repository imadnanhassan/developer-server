import { ClientLogo } from "./clientlogo.interfacec";
import ClientLogoModel from "./clientlogo.model";

const clientLogoInDB = async (logo: ClientLogo) => {
  const newLogo = await ClientLogoModel.create(logo);
  return await newLogo.save();
};

const getAllClientLogosInDB = async () => {
  const logos = await ClientLogoModel.find().sort({ createdAt: -1 });
  return logos;
};

export const ClientLogoService = {
  clientLogoInDB,
  getAllClientLogosInDB,
};
