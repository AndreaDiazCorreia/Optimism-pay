import { Router } from "express";
import { getSupportedTokens } from "../controllers/token.controller";

const router = Router();

router.get("/", getSupportedTokens);

export default router;
