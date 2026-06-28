import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import projectsRouter from "./projects";
import caseStudiesRouter from "./caseStudies";
import servicesRouter from "./services";
import companyRouter from "./company";
import mediaRouter from "./media";
import settingsRouter from "./settings";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(usersRouter);
router.use(projectsRouter);
router.use(caseStudiesRouter);
router.use(servicesRouter);
router.use(companyRouter);
router.use(mediaRouter);
router.use(settingsRouter);
router.use(dashboardRouter);

export default router;
