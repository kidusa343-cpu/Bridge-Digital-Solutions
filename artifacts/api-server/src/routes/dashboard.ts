import { Router } from "express";
import { db, projectsTable, caseStudiesTable, servicesTable, mediaTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/dashboard/stats", requireAuth, async (req, res): Promise<void> => {
  const [
    projectsResult,
    caseStudiesResult,
    servicesResult,
    mediaResult,
    featuredProjectsResult,
    featuredCaseStudiesResult,
    activeServicesResult,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)::int` }).from(projectsTable),
    db.select({ count: sql<number>`count(*)::int` }).from(caseStudiesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(servicesTable),
    db.select({ count: sql<number>`count(*)::int` }).from(mediaTable),
    db.select({ count: sql<number>`count(*)::int` }).from(projectsTable).where(eq(projectsTable.featured, true)),
    db.select({ count: sql<number>`count(*)::int` }).from(caseStudiesTable).where(eq(caseStudiesTable.featured, true)),
    db.select({ count: sql<number>`count(*)::int` }).from(servicesTable).where(eq(servicesTable.active, true)),
  ]);

  res.json({
    totalProjects: projectsResult[0]?.count ?? 0,
    totalCaseStudies: caseStudiesResult[0]?.count ?? 0,
    totalServices: servicesResult[0]?.count ?? 0,
    totalMedia: mediaResult[0]?.count ?? 0,
    featuredProjects: featuredProjectsResult[0]?.count ?? 0,
    featuredCaseStudies: featuredCaseStudiesResult[0]?.count ?? 0,
    activeServices: activeServicesResult[0]?.count ?? 0,
  });
});

export default router;
