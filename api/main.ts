import express, { Express } from "express";
import cors from "cors";

import clientRoutes from "./routes/client.routes";
import policyRoutes from "./routes/policy.routes";
import funeralRoutes from "./routes/funeral.routes";
import itemRoutes from "./routes/item.routes";
import serviceRoutes from "./routes/services.routes";
import routesRoutes from "./routes/routes.routes";

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json())

app.use("/api/clients", clientRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/funerals", funeralRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/routes", routesRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
