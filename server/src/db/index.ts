import mysql from "mysql2/promise";
import mysqlConfig from "../config/mysql.config";
import { logger } from "./../utils/pino";
import { environment } from "../config";

const env = environment;
const config = mysqlConfig(env);

export const pool = mysql.createPool(config);

pool
  .getConnection()
  .then(() => logger.info("정상적으로 db 접속에 성공하였습니다."))
  .catch((err) => logger.info("db 접속에 실패하였습니다.", err));
