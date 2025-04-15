import { model, Schema } from "mongoose";
import { caseStudies } from "./caseStudies.interface";
const caseStudiesSchema = new Schema<caseStudies>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    categories: { type: String, required: true },
  },
  { timestamps: true }
);

const CaseStudiesModel = model<caseStudies>("CaseStudies", caseStudiesSchema);
export default CaseStudiesModel;
