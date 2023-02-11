import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import {
  CreatePackageServiceDTO,
  PackageIdDTO,
  UserEntity,
  UserPackageDTO,
} from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const packageBuildQuery = new BuildQuery("package");
const stickerBuildQuery = new BuildQuery("sticker");
const userBuildQuery = new BuildQuery("user");
const userPackageBuildQuery = new BuildQuery("user_package");

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

  async buyPackage(packageIdDTO: PackageIdDTO, user: UserEntity) {
    const conn = await pool.getConnection();
    try {
      const { userId, grape } = user;

      const { query: query1, values: values1 } = userBuildQuery.makeUpdateQuery(
        { userId },
        { grape: grape - 1 }
      );
      logger.info(query1);
      logger.debug(values1);
      const [result1] = await pool.query<ResultSetHeader>(query1, values1);
      logger.debug(result1);

      const { query: query2, values: values2 } = userPackageBuildQuery.makeInsertQuery({
        packageId: packageIdDTO.packageId,
        userId,
      });
      logger.info(query2);
      logger.debug(values2);
      await conn.beginTransaction();
      const [result2] = await conn.query<ResultSetHeader>(query2, values2);
      logger.debug(result2);

      await conn.commit();
      return result2;
    } catch (err) {
      logger.error(err);
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async getOnlyPackage(packageIdDTO: PackageIdDTO, columnArr: string[] = ["*"]) {
    const { query, values } = packageBuildQuery.makeSelectQuery({ ...packageIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async getOnlyUserPackage(userPackageDTO: UserPackageDTO, columnArr: string[] = ["*"]) {
    const { query, values } = userPackageBuildQuery.makeSelectQuery({ ...userPackageDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  // async getPackageJoinStickersByPakcageId(
  //   packageIdArr: number[],
  //   columnArr: string[] = ["*"]
  // ) {
  //   const joinQuery = `JOIN (select packageId ,JSON_ARRAYAGG(JSON_OBJECT('stickerId', stickerId, 'stickerName', stickerName ,'stickerImg',stickerImg)) as stickers from sticker group by packageId ) as st on st.packageId = package.packageId`;
  //   const inQuery = `package.packageId In (${packageIdArr.join(",")})`;

  //   const { query, values } = packageBuildQuery.makeSelectQuery(
  //     undefined,
  //     undefined,
  //     joinQuery,
  //     undefined,
  //     inQuery
  //   );
  //   logger.info(query);
  //   logger.debug(values);
  //   const [result] = await pool.query<RowDataPacket[]>(query, values);
  //   logger.debug(result);
  //   return result;
  // }

  // async getPackage(PackageIdDTO: PackageIdDTO, columnArr: string[] = ["*"]) {
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
  async deleteUserPackageByPackageId(packageIdDTO: PackageIdDTO) {
    const { query, values } = userPackageBuildQuery.makeDeleteQuery({ ...packageIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
}

export const packageModel = new PackageModel();
