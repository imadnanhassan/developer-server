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

const getSingleClientLogoInDB = async (id: string) => {
  const logo = await ClientLogoModel.findById(id);
  if (!logo) {
    throw new Error("Client logo not found");
  }
  return logo;
};

const updateClientLogoInDB = async (id: string, logo: ClientLogo) => {
  const updatedLogo = await ClientLogoModel.findByIdAndUpdate(id, logo, {
    new: true,
  });
  if (!updatedLogo) {
    throw new Error("Client logo not found");
  }
  return updatedLogo;
};

const deleteClientLogoInDB = async (id: string) => {
  const deletedLogo = await ClientLogoModel.findByIdAndDelete(id);
  if (!deletedLogo) {
    throw new Error("Client logo not found");
  }
  return deletedLogo;
};

export const ClientLogoService = {
  clientLogoInDB,
  getAllClientLogosInDB,
  getSingleClientLogoInDB,
  updateClientLogoInDB,
  deleteClientLogoInDB,
};
