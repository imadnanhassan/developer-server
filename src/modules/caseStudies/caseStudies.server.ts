import QueryBuilder from "../../builder/QueryBuilder";
import { caseStudies } from "./caseStudies.interface";
import CaseStudiesModel from "./caseStudies.model";

const addCaseStudies = async (portfolio: caseStudies) => {
  const newPortfolio = await CaseStudiesModel.create(portfolio);
  return await newPortfolio.save();
};

const getAllCaseStudies = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(CaseStudiesModel.find(), query);

  queryBuilder
    .search(["title", "categories"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const caseStudy = await queryBuilder.modelQuery;

  const meta = await queryBuilder.countTotal();
  return { meta, products: caseStudy };
};

const getSingleCaseStudy = async (id: string) => {
  const caseStudy = await CaseStudiesModel.findById(id);
  if (!caseStudy) {
    throw new Error("Case study not found");
  }
  return caseStudy;
};

const updateCaseStudy = async (
  id: string,
  updatedData: Partial<caseStudies>
) => {
  const updatedPortfolio = await CaseStudiesModel.findByIdAndUpdate(
    id,
    updatedData,
    { new: true, runValidators: true }
  );
  return updatedPortfolio;
};

const deleteCaseStudy = async (id: string) => {
  const deletePortfolio = await CaseStudiesModel.findByIdAndDelete(id);
  if (!deletePortfolio) {
    throw new Error("Case study not found");
  }
  return deletePortfolio;
};

export const caseStudiesService = {
  addCaseStudies,
  getAllCaseStudies,
  getSingleCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
};
