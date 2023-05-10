import { Policy } from "@/features/policies/api/Policy";

export interface Payment {
  id?: number;
  number: string;
  date: Date;
  status: boolean;
  amount: number;
  policyId: number;
  policy: Policy;
}
