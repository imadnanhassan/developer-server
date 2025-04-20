import { model, Schema } from "mongoose";
import { ClientLogo } from "./clientlogo.interfacec";

const ClientLogoSchema = new Schema<ClientLogo>(
  {
    image: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const ClientLogoModel = model<ClientLogo>("ClientLogo", ClientLogoSchema);
export default ClientLogoModel;
