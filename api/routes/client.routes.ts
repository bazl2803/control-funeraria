import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { client } = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const data = await client.findMany({
    include: {
      policy: true,
    },
  });
  res.json(data);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await client.findUnique({ where: { id: parseInt(id) } });
  res.json(data);
});

router.post("/", async (req: Request, res: Response) => {
  const newData = await client.create({
    data: { ...req.body },
    include: {
      policy: true,
    },
  });

  res.json(newData);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updatedData = client.update({
    where: { id: parseInt(id) },
    data: { ...req.body },
  });

  res.json(updatedData);
});

export default router;
