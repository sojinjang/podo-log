import { Request, Response, NextFunction } from "express";
import { logger } from "../utils";

// 에러 타이핑 필요
export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  logger.error("\x1b[33m%s\x1b[0m", error.stack);
  logger.debug(error.statusCode, error.name, error.message);
  res.status(error.statusCode).json({ type: error.name, reason: error.message });
}
