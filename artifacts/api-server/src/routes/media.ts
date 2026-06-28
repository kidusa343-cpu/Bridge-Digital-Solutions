import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db, mediaTable } from "@workspace/db";
import { eq, like } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { UpdateMediaBody } from "@workspace/api-zod";

const router = Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "application/pdf", "video/mp4"];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.get("/media", async (req, res): Promise<void> => {
  const { type } = req.query;
  const where = type ? like(mediaTable.mimeType, `${String(type)}/%`) : undefined;
  const media = await db.select().from(mediaTable)
    .where(where)
    .orderBy(mediaTable.createdAt);
  res.json(media);
});

router.post("/media", requireAuth, upload.single("file"), async (req, res): Promise<void> => {
  if (!req.file) { res.status(400).json({ error: "No file uploaded" }); return; }
  const { alt, caption } = req.body;
  const baseUrl = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
    : `http://localhost:${process.env.PORT ?? 5000}`;
  const url = `${baseUrl}/api/media/file/${req.file.filename}`;
  const [media] = await db.insert(mediaTable).values({
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    url,
    alt: alt ?? null,
    caption: caption ?? null,
  }).returning();
  res.status(201).json(media);
});

router.get("/media/file/:filename", (req, res): void => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(uploadDir, filename);
  if (!fs.existsSync(filePath)) { res.status(404).json({ error: "File not found" }); return; }
  res.sendFile(filePath);
});

router.get("/media/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [media] = await db.select().from(mediaTable).where(eq(mediaTable.id, id)).limit(1);
  if (!media) { res.status(404).json({ error: "Media not found" }); return; }
  res.json(media);
});

router.put("/media/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const parsed = UpdateMediaBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Invalid request body" }); return; }
  const [media] = await db.update(mediaTable).set(parsed.data).where(eq(mediaTable.id, id)).returning();
  if (!media) { res.status(404).json({ error: "Media not found" }); return; }
  res.json(media);
});

router.delete("/media/:id", requireAuth, async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  const [media] = await db.select().from(mediaTable).where(eq(mediaTable.id, id)).limit(1);
  if (!media) { res.status(404).json({ error: "Media not found" }); return; }
  const filePath = path.join(uploadDir, media.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  await db.delete(mediaTable).where(eq(mediaTable.id, id));
  res.status(204).send();
});

export default router;
