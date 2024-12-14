import { Request, Response } from "express";
import { transactionService } from "../services/transaction.service";
import { ApiError } from "../middlewares/error.middleware";

export const createTransaction = (req: Request, res: Response) => {
  const transaction = transactionService.createTransaction(req.body);
  res.status(201).json(transaction);
};

export const getTransaction = (req: Request, res: Response) => {
  const transaction = transactionService.getTransaction(req.params.id);

  if (!transaction) {
    throw new ApiError(404, "Transaction not found");
  }

  res.json(transaction);
};
