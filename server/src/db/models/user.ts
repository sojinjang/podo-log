import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { CreateUserDTO, userIdDTO } from "../../types";

const userBuildQuery = new BuildQuery("user");

class UserModel {
  async create(userDTO: CreateUserDTO) {
    try {
      const { query, values } = userBuildQuery.makeInsertQuery(userDTO);
      logger.info(query);
      logger.debug(values);
      const [result] = await pool.query(query, values);
      logger.debug(result);
      return result;
    } catch (e) {
      logger.error(e);
    }
  }

  async get(userDTO: userIdDTO, columnArr: string[] = ["*"]) {
    try {
      const { query, values } = userBuildQuery.makeSelectQuery(userDTO, columnArr);
      logger.info(query);
      logger.debug(values);
      const [result] = await pool.query(query, values);
      logger.debug(result);
      return result;
    } catch (e) {
      logger.error(e);
    }
  }
}

export const userModel = new UserModel();
