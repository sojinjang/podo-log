import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { CreateDiaryDTO, GetDiaryDTO } from "../../types";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const diaryBuildQuery = new BuildQuery("diary");
// const userBookBuildQuery = new BuildQuery("user_book");

class DiaryModel {
  async create(diaryDTO: CreateDiaryDTO) {
    const { query, values } = diaryBuildQuery.makeInsertQuery({ ...diaryDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }

  async get(getDiaryDTO: GetDiaryDTO, columnArr: string[] = ["*"]) {
    const joinQuery = `join user on user.userId = diary.userId`;
    columnArr = [
      "diary.userId",
      "nickname",
      "profile",
      "diaryId",
      "bookId",
      "picture",
      "title",
      "content",
      "diary.createdAt",
      "diary.updatedAt",
    ];
    const { query, values } = diaryBuildQuery.makeSelectQuery(
      { ...getDiaryDTO },
      columnArr,
      joinQuery
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  // async getByUserId(userIdDTO: UserIdDTO, columnArr: string[] = ["*"]) {
  //   const joinQuery = `join book on book.bookId = user_book.bookId`;
  //   const { query, values } = userBookBuildQuery.makeSelectQuery(
  //     { ...userIdDTO },
  //     columnArr,
  //     joinQuery
  //   );
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<RowDataPacket[]>(query, values);
  //   logger.debug(result);
  //   return result;
  // }

  // async checkUserBook(userdiaryDTO: UserdiaryDTO) {
  //   const { query, values } = userBookBuildQuery.makeSelectQuery({ ...userdiaryDTO });
  //   const existsQuery = `SELECT EXISTS (${query})`;
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<RowDataPacket[]>(existsQuery, values);
  //   logger.debug(result);
  //   const [isMember] = Object.values(result[0]);
  //   return isMember;
  // }

  // async pacth(whereDTO: GetdiaryDTO, diaryDTO: UpdatediaryDTO) {
  //   const { query, values } = diaryBuildQuery.makeUpdateQuery({ ...whereDTO }, { ...diaryDTO });
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<ResultSetHeader>(query, values);
  //   logger.debug(result);
  //   return result;
  // }

  // async outBookById(userdiaryDTO: UserdiaryDTO) {
  //   const { query, values } = userBookBuildQuery.makeDeleteQuery({ ...userdiaryDTO });
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<OkPacket>(query, values);
  //   logger.debug(result);
  //   return result;
  // }
}

export const diaryModel = new DiaryModel();
