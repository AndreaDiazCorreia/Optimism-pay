import { Request, Response, NextFunction } from "express";
import { ApiError } from "./error.middleware";

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new ApiError(401, "Invalid API key");
  }

  next();
};
