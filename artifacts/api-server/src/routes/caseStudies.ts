import { Router } from "express";
import { db, caseStudiesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { CreateCaseStudyBody, UpdateCaseStudyBody } from "@workspace/api-zod";

const router = Router();

router.get("/case-studies", async (req, res): Promise<void> => {
  const { featured } = req.query;
  const where = featured !== undefined ? eq(caseStudiesTable.featured, featured === "true") : undefined;
  const caseStudies = await db.select().from(caseStudiesTable)
    .where(where)
    .orderBy(caseStudiesTable.sortOrder, caseStudiesTable.createdAt);
  res.json(caseStudies);
});

router.post("/case-studies", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateCaseStudyBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body", details: parsed.error.issues }); return; }
  const [caseStudy] = await db.insert(caseStudiesTable).values(parsed.data).returning();
  res.status(201).json(caseStudy);
});

router.get("/case-studies/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [caseStudy] = await db.select().from(caseStudiesTable).where(eq(caseStudiesTable.id, id)).limit(1);
  if (!caseStudy) { res.status(404).json({ error: "Case study not found" }); return; }
  res.json(caseStudy);
});

router.put("/case-studies/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = UpdateCaseStudyBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body", details: parsed.error.issues }); return; }
  const [caseStudy] = await db.update(caseStudiesTable).set(parsed.data).where(eq(caseStudiesTable.id, id)).returning();
  if (!caseStudy) { res.status(404).json({ error: "Case study not found" }); return; }
  res.json(caseStudy);
});

router.delete("/case-studies/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  await db.delete(caseStudiesTable).where(eq(caseStudiesTable.id, id));
  res.status(204).send();
});

export default router;
