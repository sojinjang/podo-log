import mysql from "mysql2/promise";
import mysqlConfig from "../config/mysql.config";

const env = process.env.NODE_ENV || "local";
const config = mysqlConfig(env);

export const pool = mysql.createPool(config);

pool
  .getConnection()
  .then(() => console.log("정상적으로 db 접속에 성공하였습니다."))
  .catch((err) => console.log("db 접속에 실패하였습니다.", err));
