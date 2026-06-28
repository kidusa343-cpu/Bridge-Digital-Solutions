import { Router } from "express";
import { db, settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { UpsertSettingBody } from "@workspace/api-zod";

const router = Router();

router.get("/settings", async (req, res): Promise<void> => {
  const settings = await db.select().from(settingsTable).orderBy(settingsTable.key);
  res.json(settings);
});

router.get("/settings/:key", async (req, res): Promise<void> => {
  const key = String(req.params.key);
  const [setting] = await db.select().from(settingsTable).where(eq(settingsTable.key, key)).limit(1);
  if (!setting) { res.status(404).json({ error: "Setting not found" }); return; }
  res.json(setting);
});

router.put("/settings/:key", requireAuth, async (req, res): Promise<void> => {
  const key = String(req.params.key);
  const parsed = UpsertSettingBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body" }); return; }
  const [existing] = await db.select().from(settingsTable).where(eq(settingsTable.key, key)).limit(1);
  if (existing) {
    const [setting] = await db.update(settingsTable)
      .set({ value: parsed.data.value, description: parsed.data.description })
      .where(eq(settingsTable.key, key))
      .returning();
    res.json(setting);
  } else {
    const [setting] = await db.insert(settingsTable)
      .values({ key, value: parsed.data.value, description: parsed.data.description })
      .returning();
    res.json(setting);
  }
});

export default router;
