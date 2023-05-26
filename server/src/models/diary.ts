import { pool } from "../db/index";
import { logger, BuildQuery } from "../utils";
import {
  CreateDiaryDTO,
  DiaryIdDTO,
  GetDiaryDTO,
  PageDTO,
  StickedStickersDTO,
  UpdateDiaryDTO,
} from "../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Service } from "typedi";

const diaryBuildQuery = new BuildQuery("diary");
const stickedStickerBuildQuery = new BuildQuery("sticked_sticker");

@Service()
export class DiaryModel {
  async create(diaryDTO: CreateDiaryDTO) {
    const { query, values } = diaryBuildQuery.makeInsertQuery({ ...diaryDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async getWithUserStickers(
    getDiaryDTO: GetDiaryDTO,
    pageDTO: PageDTO,
    columnArr: string[] = ["*"]
  ) {
    const joinQuery = `JOIN user on user.userId = diary.userId`;
    const countQuery = `(select count(*) from comment as c where c.diaryId = diary.diaryId) as numComments`;
    const countQuery2 = `(SELECT JSON_ARRAYAGG(JSON_OBJECT('stickedStickerId', stickedStickerId, 'stickerId',stickerId,'stickerName', stickerName,'stickerImg',stickerImg, 'userId', userId ,'locX',locX,'locY',locY))
    FROM (
      SELECT stickedStickerId, s.stickerId, stickerName, stickerImg, userId, locX, locY 
      FROM sticked_sticker ss
      JOIN sticker s ON s.stickerId = ss.stickerId
      WHERE ss.diaryId = diary.diaryId
      ORDER BY stickedStickerId ASC
    ) AS sst
   ) AS stickers`;

    const pageQuery = `ORDER BY diaryId DESC LIMIT ${pageDTO.offset}, ${pageDTO.limit}`;
    columnArr = [
      "diary.userId",
      "nickname",
      "profile",
      "diary.diaryId",
      "bookId",
      "picture",
      "title",
      "content",
      countQuery,
      countQuery2,
      "diary.createdAt",
      "diary.updatedAt",
    ];
    const { query, values } = diaryBuildQuery.makeSelectQuery(
      { ...getDiaryDTO },
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
  async get(getDiaryDTO: GetDiaryDTO, columnArr: string[] = ["*"]) {
    const { query, values } = diaryBuildQuery.makeSelectQuery({ ...getDiaryDTO }, columnArr);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async pacth(whereDTO: GetDiaryDTO, diaryDTO: UpdateDiaryDTO) {
    const { query, values } = diaryBuildQuery.makeUpdateQuery(
      { ...whereDTO },
      { ...diaryDTO }
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async deleteById(diaryIdDTO: DiaryIdDTO) {
    const { query, values } = diaryBuildQuery.makeDeleteQuery({ ...diaryIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async getStickersByDiaryId(diaryIdDTO: DiaryIdDTO) {
    const joinQuery = `JOIN sticker on sticker.stickerId = sticked_sticker.stickerId`;
    const columnArr = [
      "locX",
      "locY",
      "userId",
      "sticker.stickerId",
      "stickerImg",
      "stickerName",
      "stickedStickerId",
      "packageId",
    ];
    const { query, values } = stickedStickerBuildQuery.makeSelectQuery(
      { ...diaryIdDTO },
      columnArr,
      joinQuery
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async putStickers(stickedStickersDTOArr: StickedStickersDTO[]) {
    const { query, values } =
      stickedStickerBuildQuery.makeArrInsertQuery(stickedStickersDTOArr);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }
}
