import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { UserBookDTO, UserIdDTO } from "../../types";
import { OkPacket, RowDataPacket } from "mysql2";

const userBookBuildQuery = new BuildQuery("user_book");

class UserBookModel {
  async joinBook(userBookDTO: UserBookDTO) {
    const { query, values } = userBookBuildQuery.makeInsertQuery({ ...userBookDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }

  async getByUserId(userIdDTO: UserIdDTO, columnArr: string[] = ["*"]) {
    const joinQuery = `join book on book.bookId = user_book.bookId`;
    const countQuery = `(select count(*) from user_book as ub where ub.bookId = user_book.bookId) as numMembers`;
    columnArr = ["book.bookId", "bookName", "color", countQuery];
    const { query, values } = userBookBuildQuery.makeSelectQuery(
      { ...userIdDTO },
      columnArr,
      joinQuery
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async checkUserBook(userBookDTO: UserBookDTO) {
    const { query, values } = userBookBuildQuery.makeSelectQuery({ ...userBookDTO });
    const existsQuery = `SELECT EXISTS (${query})`;
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(existsQuery, values);
    logger.debug(result);
    const [isMember] = Object.values(result[0]);
    return isMember;
  }

  async outBookById(userBookDTO: UserBookDTO) {
    const { query, values } = userBookBuildQuery.makeDeleteQuery({ ...userBookDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }
}

export const userBookModel = new UserBookModel();
