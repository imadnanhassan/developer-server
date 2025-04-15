import { z } from "zod";

export const PortfolioSchema = z.object({
  title: z.string().min(10, "Title is required"),
  description: z.string().min(10, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  link: z.string().url("Link must be a valid URL"),
  categories: z.string().min(3, "Categories are required"),
});
