import { z } from "zod";

export const ClientLogoSchema = z.object({
  image: z.string().url("Image must be a valid URL"),
  link: z.string().url("Link must be a valid URL"),
});
