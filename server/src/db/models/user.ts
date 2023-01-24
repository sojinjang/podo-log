import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import {
  CreateUserDTO,
  GetUserDTO,
  SNSCreateUserDTO,
  UpdateUserDTO,
  UserIdDTO,
} from "../../types";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const userBuildQuery = new BuildQuery("user");
const t: CreateUserDTO = {
  email: "string",
  password: "string",
  nickname: "string",
  profile: "string",
};

class UserModel {
  async create(userDTO: CreateUserDTO | SNSCreateUserDTO) {
    const { query, values } = userBuildQuery.makeInsertQuery({ ...userDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }

  async get(userDTO: GetUserDTO, columnArr: string[] = ["*"]) {
    const { query, values } = userBuildQuery.makeSelectQuery({ ...userDTO }, columnArr);
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
    const withdrawalTime = { deletedAt: "now()" };
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
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }
}

export const userModel = new UserModel();
