import { logger } from "../utils";
import expressLoader from "./express";
import { mysqlLoader } from "./mysql";
import express from "express";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  const mysqlConnection = await mysqlLoader();
  await expressLoader({ app: expressApp });
  logger.info("Express 가 로드되었습니다.");
};
