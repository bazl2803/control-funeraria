export interface Funeral {
  id?: number;
  burial_date: Date;
  pickup_date: Date;
  entry_date?: Date;
  burial_adress: string;
  worship_adress: string;
  graveyard: string;
  type: String;
}
