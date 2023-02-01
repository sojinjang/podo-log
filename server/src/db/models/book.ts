import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import {
  CreateBookDTO,
  GetBookDTO,
  InvttCodeDTO,
  UpdateBookDTO,
  UserBookDTO,
  UserIdDTO,
} from "../../types";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const bookBuildQuery = new BuildQuery("book");
const userBookBuildQuery = new BuildQuery("user_book");
const invttCodeBuildQuery = new BuildQuery("invtt_code");

class BookModel {
  async create(bookDTO: CreateBookDTO, userIdDTO: UserIdDTO, invttCodeDTO: InvttCodeDTO) {
    const conn = await pool.getConnection();
    try {
      const { query: query1, values: values1 } = bookBuildQuery.makeInsertQuery({
        ...bookDTO,
      });
      logger.info(query1);
      logger.debug(values1);

      await conn.beginTransaction();

      const [result1] = await conn.query<OkPacket>(query1, values1);
      logger.debug(result1);

      const userBookDTO = {
        bookId: result1.insertId,
        userId: userIdDTO.userId,
      };
      const { query: query2, values: values2 } = userBookBuildQuery.makeInsertQuery({
        ...userBookDTO,
      });
      logger.info(query2);
      logger.debug(values2);
      const [result2] = await conn.query<OkPacket>(query2, values2);
      logger.debug(result2);

      const createInvttCodeDTO = {
        bookId: result1.insertId,
        ...invttCodeDTO,
      };
      const { query: query3, values: values3 } = invttCodeBuildQuery.makeInsertQuery({
        ...createInvttCodeDTO,
      });
      logger.info(query3);
      logger.debug(values3);
      const [result3] = await conn.query<OkPacket>(query3, values3);
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

  async pacth(whereDTO: GetBookDTO, bookDTO: UpdateBookDTO) {
    const { query, values } = bookBuildQuery.makeUpdateQuery({ ...whereDTO }, { ...bookDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
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

export const bookModel = new BookModel();
