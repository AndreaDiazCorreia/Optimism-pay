import { Router } from "express";
import {
  createTransaction,
  getTransaction,
} from "../controllers/transaction.controller";

const router = Router();

router.post("/", createTransaction);
router.get("/:id", getTransaction);

export default router;
