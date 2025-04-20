import { Router } from "express";
import { PortfolioRoutes } from "../modules/caseStudies/caseStudies.router";
import { ClientLogoRouter } from "../modules/clientLogo/clientlogo.router";

const router = Router();

const moduleRoutes = [
  {
    path: "/portfolio",
    route: PortfolioRoutes,
  },
  {
    path: "/client-logo",
    route: ClientLogoRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
