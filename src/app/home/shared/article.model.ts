export interface Article {
  code: string;
  reference?: string;
  description?: string;
  retailPrice?: number;
  stock?: number;
  provider?: string;
  discontinued?: boolean;
  registrationDate?: Date;
}
