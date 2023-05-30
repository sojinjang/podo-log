import { Request, Response, NextFunction } from "express";
import { environment } from "../../config";
import { ApiError, ErrorType, InternalError } from "../../core/api-error";
import { logger } from "../../utils";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  } else {
    logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err);
    if (environment === "dev") {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
}
