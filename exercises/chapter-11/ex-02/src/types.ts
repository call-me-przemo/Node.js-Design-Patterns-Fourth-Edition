export interface Transaction {
  amount: number;
  product: string;
}

export type TotalSalesCallback = (err: Error | null, sum?: number) => void;
