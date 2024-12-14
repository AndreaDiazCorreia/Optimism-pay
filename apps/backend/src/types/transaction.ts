export interface Transaction {
  id: string;
  senderAddress: string;
  recipientAddress: string;
  token: string;
  amount: number;
  status: TransactionStatus;
  timestamp: Date;
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface CreateTransactionDto {
  senderAddress: string;
  recipientAddress: string;
  token: string;
  amount: number;
}
