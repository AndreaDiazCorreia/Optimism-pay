import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import { validateApiKey } from "./middlewares/auth.middleware";
import transactionRoutes from "./routes/transaction.routes";
import tokenRoutes from "./routes/token.routes";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api/transactions", validateApiKey, transactionRoutes);
app.use("/api/tokens", validateApiKey, tokenRoutes);

// Error handling
app.use(errorHandler);

export default app;
