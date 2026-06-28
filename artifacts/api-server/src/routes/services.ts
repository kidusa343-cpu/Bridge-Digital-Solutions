import { Router } from "express";
import { db, servicesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { CreateServiceBody, UpdateServiceBody } from "@workspace/api-zod";

const router = Router();

router.get("/services", async (req, res): Promise<void> => {
  const services = await db.query.servicesTable.findMany({
    orderBy: (t, { asc }) => [asc(t.sortOrder), asc(t.createdAt)],
  });
  res.json(services);
});

router.post("/services", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body", details: parsed.error.issues }); return; }
  const [service] = await db.insert(servicesTable).values(parsed.data).returning();
  res.status(201).json(service);
});

router.get("/services/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, id)).limit(1);
  if (!service) { res.status(404).json({ error: "Service not found" }); return; }
  res.json(service);
});

router.put("/services/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = UpdateServiceBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body", details: parsed.error.issues }); return; }
  const [service] = await db.update(servicesTable).set(parsed.data).where(eq(servicesTable.id, id)).returning();
  if (!service) { res.status(404).json({ error: "Service not found" }); return; }
  res.json(service);
});

router.delete("/services/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  await db.delete(servicesTable).where(eq(servicesTable.id, id));
  res.status(204).send();
});

export default router;
