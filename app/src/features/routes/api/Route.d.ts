import { Client } from "@/features/clients/api/Client";

export interface Route {
  id: number;
  name: string;
  location: string;
  payday: number;
  client?: Client[];
}
