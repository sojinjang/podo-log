import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { CommentIdDTO, CreateCommentDTO, GetCommentDTO, UpdateCommentDTO } from "../../types";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const commentBuildQuery = new BuildQuery("comment");

class CommentModel {
  async create(commentDTO: CreateCommentDTO) {
    const { query, values } = commentBuildQuery.makeInsertQuery({ ...commentDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }

  // async getWithUser(getcommentDTO: GetcommentDTO, pageDTO: PageDTO, columnArr: string[] = ["*"]) {
  //   const joinQuery = `JOIN user on user.userId = diary.userId`;
  //   const pageQuery = `LIMIT ${pageDTO.offset}, ${pageDTO.limit}`;
  //   columnArr = [
  //     "diary.userId",
  //     "nickname",
  //     "profile",
  //     "diaryId",
  //     "bookId",
  //     "picture",
  //     "title",
  //     "content",
  //     "diary.createdAt",
  //     "diary.updatedAt",
  //   ];
  //   const { query, values } = commentBuildQuery.makeSelectQuery(
  //     { ...getcommentDTO },
  //     columnArr,
  //     joinQuery,
  //     pageQuery
  //   );
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<RowDataPacket[]>(query, values);
  //   logger.debug(result);
  //   return result;
  // }

  async get(getCommentDTO: GetCommentDTO, columnArr: string[] = ["*"]) {
    const { query, values } = commentBuildQuery.makeSelectQuery(
      { ...getCommentDTO },
      columnArr
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async pacth(whereDTO: CommentIdDTO, commentDTO: UpdateCommentDTO) {
    const { query, values } = commentBuildQuery.makeUpdateQuery(
      { ...whereDTO },
      { ...commentDTO }
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  // async deleteById(diaryIdDTO: DiaryIdDTO) {
  //   const { query, values } = commentBuildQuery.makeDeleteQuery({ ...diaryIdDTO });
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<OkPacket>(query, values);
  //   logger.debug(result);
  //   return result;
  // }
}

export const commentModel = new CommentModel();
