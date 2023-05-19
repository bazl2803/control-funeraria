import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { route } = new PrismaClient();
const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const data = await route.findMany({
    include: {
      client: true,
    },
  });
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await route.findUnique({ where: { id: parseInt(id) } });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const { name, location, payday } = req.body;
  await route.create({ data: { name, location, payday } });

  res.json(req.body);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = route.update({
    where: { id: parseInt(id) },
    data: { ...req.body },
  });

  res.json(updatedData);
});

export default router;
