import { Funeral } from "@/features/funerals/api/Funeral";
import { Policy } from "@/features/policies/api/Policy";

export interface Client {
  id?: number;
  created_at: Date;
  modified_at?: Date;
  name: string;
  doc_id: string;
  type: string;
  job?: string;
  incomes?: number;
  extension_day?: number;
  status: string;
  routeId?: number;
  route_index?: number;
  method: string;
  phone_number?: string;
  email?: String;
  address?: string;
  policy?: Policy[];
}
