import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { payment } = new PrismaClient();
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const data = await payment.findMany();
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await payment.findUnique({ where: { id: parseInt(id) }, include: { policy: true } });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const newData = await payment.create({
    data: { ...req.body },
  });

  res.json(newData);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = await payment.delete({
    where: { id: parseInt(id) },
  });

  res.json(updatedData);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = await payment.update({
    where: { id: parseInt(id) },
    data: { ...req.body },
  });

  res.json(updatedData);
});

export default router;
