import { Router } from "express";
import { db, companyTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { UpdateCompanyBody } from "@workspace/api-zod";

const router = Router();

router.get("/company", async (req, res): Promise<void> => {
  const [company] = await db.select().from(companyTable).limit(1);
  if (!company) { res.status(404).json({ error: "Company profile not found" }); return; }
  res.json(company);
});

router.put("/company", requireAuth, async (req, res): Promise<void> => {
  const parsed = UpdateCompanyBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body", details: parsed.error.issues }); return; }
  const [existing] = await db.select({ id: companyTable.id }).from(companyTable).limit(1);
  if (!existing) {
    const [company] = await db.insert(companyTable).values(parsed.data as any).returning();
    res.json(company);
    return;
  }
  const [company] = await db.update(companyTable).set(parsed.data).where(eq(companyTable.id, existing.id)).returning();
  res.json(company);
});

export default router;
