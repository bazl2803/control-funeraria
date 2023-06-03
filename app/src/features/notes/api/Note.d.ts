import { Client } from "@/features/clients/api/Client";

export interface Note {
  id: number;
  text: String;
  clientId: number;
  client: Client;
}
