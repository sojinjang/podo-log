import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { CommentIdDTO, CreateCommentDTO, GetCommentDTO, UpdateCommentDTO } from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Service } from "typedi";

const commentBuildQuery = new BuildQuery("comment");

@Service()
export class CommentModel {
  async create(commentDTO: CreateCommentDTO) {
    const { query, values } = commentBuildQuery.makeInsertQuery({ ...commentDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async get(getCommentDTO: GetCommentDTO, columnArr: string[] = ["*"]) {
    const joinQuery = `JOIN user on user.userId = comment.userId`;
    const pageQuery = `ORDER BY createdAt ASC `;
    columnArr = [
      "commentId",
      "comment.userId",
      "nickname",
      "profile",
      "parentCommentId",
      "reply",
      "comment.createdAt",
      "comment.updatedAt",
    ];

    const { query, values } = commentBuildQuery.makeSelectQuery(
      { ...getCommentDTO },
      columnArr,
      joinQuery,
      pageQuery
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

  async deleteById(commentIdDTO: CommentIdDTO) {
    const { query, values } = commentBuildQuery.makeDeleteQuery({ ...commentIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
}
