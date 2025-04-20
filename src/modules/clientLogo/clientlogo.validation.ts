import { z } from "zod";

export const ClientLogoSchema = z.object({
  image: z.string(), // File upload (no changes)
  link: z.string().default(""), // Default empty string if not provided
});
