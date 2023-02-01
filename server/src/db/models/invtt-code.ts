import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { BookIdDTO, CreateInvttCodeDTO } from "../../types";
import { OkPacket, RowDataPacket } from "mysql2";

const invttCodeBuildQuery = new BuildQuery("invtt_code");

class InvttCodeModel {
  async create(invttCodeDTO: CreateInvttCodeDTO) {
    const { query, values } = invttCodeBuildQuery.makeInsertQuery({ ...invttCodeDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }

  async getByBookId(bookIdDTO: BookIdDTO, columnArr: string[] = ["*"]) {
    const { query, values } = invttCodeBuildQuery.makeSelectQuery({ ...bookIdDTO }, columnArr);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }
}

export const invttCodeModel = new InvttCodeModel();
