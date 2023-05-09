export interface Payment {
  id?: number;
  number: string;
  date: Date;
  status: number;
  policyId: number;
}
