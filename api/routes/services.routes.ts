import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { service } = new PrismaClient();
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const data = await service.findMany();
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await service.findUnique({ where: { id: parseInt(id) } });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, price, prime, fee } = req.body;
  const newData = await service.create({
    data: {
      name,
      price,
      prime,
      fee,
    },
  });

  res.json(newData);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = await service.update({
    where: { id: parseInt(id) },
    data: { ...req.body },
  });

  res.json(updatedData);
});

export default router;
