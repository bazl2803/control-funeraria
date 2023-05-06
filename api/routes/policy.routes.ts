import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { policy } = new PrismaClient();
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const data = await policy.findMany({ include: { payment: true } });
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await policy.findUnique({ where: { id: parseInt(id) } });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const newData = await policy.create({
    data: { ...req.body },
  });
  res.json(newData);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = await policy.update({
    where: { id: parseInt(id) },
    data: { ...req.body },
  });

  res.json(updatedData);
});

export default router;
