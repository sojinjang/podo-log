import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { BookIdDTO, InvttCodeDTO } from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const invttCodeBuildQuery = new BuildQuery("invtt_code");

class InvttCodeModel {
  async patchByBookId(whereDTO: BookIdDTO, invttCodeDTO: InvttCodeDTO) {
    const { query, values } = invttCodeBuildQuery.makeUpdateQuery(
      { ...whereDTO },
      { ...invttCodeDTO }
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
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
