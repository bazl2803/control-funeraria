export interface Client {
  id?: number;
  name: string;
  type: string;
  doc_id: string;
  extension_day?: number;
  status: string;
  address: string;
  route_id?: number;
  route_index?: number;
  method: string;
  phone_number: string;
  email: String;
  job: string;
  incomes: number;
  created_at: Date;
  modified_at?: Date;
}
