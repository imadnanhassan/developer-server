import { z } from "zod";

export const ClientLogoSchema = z.object({
  image: z.string(),
  link: z.string().default(""),
  name: z.string().default("Company name"),
});
