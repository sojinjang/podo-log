import { pool } from "../db/index";
import { logger, BuildQuery } from "../utils";
import {
  CreateUserDTO,
  GetUserDTO,
  SNSCreateUserDTO,
  UpdateUserDTO,
  UserIdDTO,
} from "../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { defaultPackageIds } from "../config";
import { Service } from "typedi";

const userBuildQuery = new BuildQuery("user");
const grainBuildQuery = new BuildQuery("user_grain");
const userPackageQuery = new BuildQuery("user_package");

@Service()
export class UserModel {
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

      const userId = result1.insertId;
      const grainDTO = {
        userId,
        grain: 0,
      };
      const { query: query2, values: values2 } = grainBuildQuery.makeInsertQuery({
        ...grainDTO,
      });
      logger.info(query2);
      logger.debug(values2);
      const [result2] = await conn.query<ResultSetHeader>(query2, values2);
      logger.debug(result2);

      const setDefaultPackage = defaultPackageIds.map((packageId) => ({ userId, packageId }));
      const { query: query3, values: values3 } =
        userPackageQuery.makeArrInsertQuery(setDefaultPackage);
      logger.info(query3);
      logger.debug(values3);
      const [result3] = await conn.query<ResultSetHeader>(query3, values3);
      logger.debug(result3);

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

  async get(userDTO: GetUserDTO, deleteCheck = true) {
    const { query, values } = userBuildQuery.makeSelectQuery({ ...userDTO });
    logger.info(query);
    logger.debug(values);
    const queryAddNull = deleteCheck ? query + ` and deletedAt is null` : query;
    const [result] = await pool.query<RowDataPacket[]>(queryAddNull, values);
    logger.debug(result);
    return result;
  }

  async getGrain(userIdDTO: GetUserDTO) {
    const { query, values } = grainBuildQuery.makeSelectQuery({ ...userIdDTO });
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
