import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { CreatePackageServiceDTO } from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const packageBuildQuery = new BuildQuery("package");
const stickerBuildQuery = new BuildQuery("sticker");

class PackageModel {
  async create(createPackageServiceDTO: CreatePackageServiceDTO) {
    const conn = await pool.getConnection();
    try {
      const { stickers, packageName, podoPrice } = createPackageServiceDTO;
      const { query: query1, values: values1 } = packageBuildQuery.makeInsertQuery({
        packageName,
        podoPrice,
      });
      logger.info(query1);
      logger.debug(values1);
      await conn.beginTransaction();
      const [result1] = await conn.query<ResultSetHeader>(query1, values1);
      logger.debug(result1);

      const stickerDTOArr = stickers
        .filter((sticker) => typeof sticker !== "undefined")
        .map((sticker) => {
          const stickerDTO = { ...sticker, packageId: result1.insertId };
          return stickerDTO;
        });

      const { query: query2, values: values2 } =
        stickerBuildQuery.makeArrInsertQuery(stickerDTOArr);
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

  // async get(getCommentDTO: GetCommentDTO, columnArr: string[] = ["*"]) {
  //   const joinQuery = `JOIN user on user.userId = comment.userId`;
  //   columnArr = [
  //     "commentId",
  //     "comment.userId",
  //     "nickname",
  //     "profile",
  //     "parentCommentId",
  //     "reply",
  //     "comment.createdAt",
  //     "comment.updatedAt",
  //   ];
  //   const { query, values } = packageBuildQuery.makeSelectQuery(
  //     { ...getCommentDTO },
  //     columnArr,
  //     joinQuery
  //   );
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<RowDataPacket[]>(query, values);
  //   logger.debug(result);
  //   return result;
  // }
  // async pacth(whereDTO: CommentIdDTO, commentDTO: UpdateCommentDTO) {
  //   const { query, values } = packageBuildQuery.makeUpdateQuery(
  //     { ...whereDTO },
  //     { ...commentDTO }
  //   );
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<ResultSetHeader>(query, values);
  //   logger.debug(result);
  //   return result;
  // }
  // async deleteById(commentIdDTO: CommentIdDTO) {
  //   const { query, values } = packageBuildQuery.makeDeleteQuery({ ...commentIdDTO });
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<ResultSetHeader>(query, values);
  //   logger.debug(result);
  //   return result;
  // }
}

export const packageModel = new PackageModel();
