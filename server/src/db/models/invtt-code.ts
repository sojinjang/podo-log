import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { GetInvttCodeDTO, InvttCodeDTO } from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Service } from "typedi";

const invttCodeBuildQuery = new BuildQuery("invtt_code");

@Service()
export class InvttCodeModel {
  async patch(whereDTO: GetInvttCodeDTO, invttCodeDTO: InvttCodeDTO) {
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

  async get(invttCodeDTO: GetInvttCodeDTO, columnArr: string[] = ["*"]) {
    const { query, values } = invttCodeBuildQuery.makeSelectQuery(
      { ...invttCodeDTO },
      columnArr
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }
}
