import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import {
  CreatePackageServiceDTO,
  PackageIdDTO,
  UserEntity,
  UserPackageDTO,
} from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Service } from "typedi";

const packageBuildQuery = new BuildQuery("package");
const stickerBuildQuery = new BuildQuery("sticker");
const userBuildQuery = new BuildQuery("user");
const userPackageBuildQuery = new BuildQuery("user_package");

@Service()
export class PackageModel {
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

  async buyPackage(packageDTO: UserPackageDTO, user: UserEntity) {
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
        ...packageDTO,
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

  async getStickers(packageIdDTO: PackageIdDTO, columnArr: string[] = ["*"]) {
    const { query, values } = stickerBuildQuery.makeSelectQuery({ ...packageIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
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

  async getPackageJoinStickersByPakcageIdArr(
    packageIdArr: number[],
    isIn: boolean = true,
    columnArr: string[] = ["*"]
  ) {
    let inQuery;
    if (packageIdArr.length === 0) {
      if (isIn) return [];
      else inQuery = ``;
    } else {
      inQuery = `package.packageId ${isIn ? "in" : "not in"} (${packageIdArr.join(",")})`;
    }

    const stikers = `(SELECT JSON_ARRAYAGG(JSON_OBJECT('stickerId', s.stickerId, 'stickerName', s.stickerName, 'stickerImg', s.stickerImg)) FROM sticker s WHERE s.packageId = package.packageId) as stickers `;
    columnArr = [`package.packageId`, `package.packageName`, `package.podoPrice`, stikers];
    const groupQuery = `GROUP BY package.packageId`;
    const { query, values } = packageBuildQuery.makeSelectQuery(
      undefined,
      columnArr,
      undefined,
      groupQuery,
      inQuery
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async deleteUserPackageByPackageId(packageIdDTO: PackageIdDTO) {
    const { query, values } = userPackageBuildQuery.makeDeleteQuery({ ...packageIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
  async deleteUserPackageByPackageIdArr(packageIdArr: number[]) {
    if (packageIdArr.length === 0) return [];
    const inQuery = `user_package.packageId In (${packageIdArr.join(",")})`;

    const { query, values } = userPackageBuildQuery.makeDeleteQuery(undefined, inQuery);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
  async deletePackage(packageIdDTO: PackageIdDTO) {
    const { query, values } = packageBuildQuery.makeDeleteQuery({ ...packageIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
}
