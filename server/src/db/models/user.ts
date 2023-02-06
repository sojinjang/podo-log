import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import {
  CreateUserDTO,
  GetUserDTO,
  SNSCreateUserDTO,
  UpdateUserDTO,
  UserIdDTO,
} from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const userBuildQuery = new BuildQuery("user");
const grainBuildQuery = new BuildQuery("user_grain");

class UserModel {
  async create(userDTO: CreateUserDTO | SNSCreateUserDTO) {
    const conn = await pool.getConnection();
    try {
      const { query: query1, values: values1 } = userBuildQuery.makeInsertQuery({
        ...userDTO,
      });
      logger.info(query1);
      logger.debug(values1);

      await conn.beginTransaction();

      const [result1] = await conn.query<ResultSetHeader>(query1, values1);
      logger.debug(result1);

      const grainDTO = {
        userId: result1.insertId,
        grain: 0,
      };
      const { query: query2, values: values2 } = grainBuildQuery.makeInsertQuery({
        ...grainDTO,
      });
      logger.info(query2);
      logger.debug(values2);
      const [result2] = await conn.query<ResultSetHeader>(query2, values2);
      logger.debug(result2);

      await conn.commit();
      return result1;
    } catch (err) {
      logger.error(err);
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async get(userDTO: GetUserDTO, columnArr: string[] = ["*"]) {
    const { query, values } = userBuildQuery.makeSelectQuery({ ...userDTO }, columnArr);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async getGrain(userIdDTO: GetUserDTO, columnArr: string[] = ["*"]) {
    const { query, values } = grainBuildQuery.makeSelectQuery({ ...userIdDTO }, columnArr);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async pacth(whereDTO: GetUserDTO, userDTO: UpdateUserDTO) {
    const { query, values } = userBuildQuery.makeUpdateQuery({ ...whereDTO }, { ...userDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async withdrawalById(userDTO: UserIdDTO) {
    const deletedAt = new Date();
    const withdrawalTime = { deletedAt };
    const { query, values } = userBuildQuery.makeUpdateQuery(
      { ...userDTO },
      { ...withdrawalTime }
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async deleteById(userDTO: UserIdDTO) {
    const { query, values } = userBuildQuery.makeDeleteQuery({ ...userDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
}

export const userModel = new UserModel();
