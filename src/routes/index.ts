import { Router } from "express";
import { PortfolioRoutes } from "../modules/caseStudies/caseStudies.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/portfolio",
    route: PortfolioRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
