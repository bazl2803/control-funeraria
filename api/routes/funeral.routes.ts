import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { funeral } = new PrismaClient();
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const data = await funeral.findMany();
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await funeral.findUnique({ where: { id: parseInt(id) } });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const newData = funeral.create({
    data: { ...req.body },
  });
  res.json(newData);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = funeral.update({
    where: { id: parseInt(id) },
    data: { ...req.body },
  });

  res.json(updatedData);
});

export default router;
