import {
  Transaction,
  CreateTransactionDto,
  TransactionStatus,
} from "../types/transaction";
import crypto from "crypto";

class TransactionService {
  private transactions: Map<string, Transaction> = new Map();

  createTransaction(dto: CreateTransactionDto): Transaction {
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      ...dto,
      status: TransactionStatus.PENDING,
      timestamp: new Date(),
    };

    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getTransaction(id: string): Transaction | undefined {
    return this.transactions.get(id);
  }
}

export const transactionService = new TransactionService();
