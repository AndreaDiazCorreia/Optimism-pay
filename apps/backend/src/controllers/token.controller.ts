import { Request, Response } from "express";
import { tokenService } from "../services/token.service";

export const getSupportedTokens = (req: Request, res: Response) => {
  const tokens = tokenService.getSupportedTokens();
  res.json(tokens);
};
