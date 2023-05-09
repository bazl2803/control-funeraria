import { Funeral } from "@/features/funerals/api/Funeral";
import { Payment } from "@/features/payments/api/payment";
import { Service } from "@/features/services/api/Service";

export interface Policy {
  id: number;
  clientId: number;
  serviceId: number;
  funeralId?: number;
  date?: Date;
  balance: number;
  value: number;
  fee: number;
  prime: number;
  notes?: string;
  status?: string;
  modality?: string;
  payment: Payment[];
  service: Service;
  funeral: Funeral;
}
