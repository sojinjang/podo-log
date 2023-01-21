import { Request, Response, NextFunction } from "express";
import { AsyncFunction } from "../types";

export default (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };
