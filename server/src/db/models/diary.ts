import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import {
  CreateDiaryDTO,
  DiaryIdDTO,
  GetDiaryDTO,
  PageDTO,
  StickedStickersDTO,
  UpdateDiaryDTO,
} from "../../types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const diaryBuildQuery = new BuildQuery("diary");
const stickedStickerBuildQuery = new BuildQuery("sticked_sticker");

class DiaryModel {
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
    const joinQuery1 = `JOIN user on user.userId = diary.userId`;
    const joinQuery2 = `left JOIN (select diaryId ,JSON_ARRAYAGG(JSON_OBJECT('stickedStickerId', stickedStickerId, 'stickerId', s.stickerId,'stickerName', stickerName,'stickerImg',stickerImg, 'userId', userId ,'locX',locX,'locY',locY)) as stickers from sticked_sticker ss
    join sticker s on s.stickerId=ss.stickerId
    group by diaryId ) as sst on sst.diaryId = diary.diaryId`;

    const joinQuery = joinQuery1 + " " + joinQuery2;
    const countQuery = `(select count(*) from comment as c where c.diaryId = diary.diaryId) as numComments`;
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
      "stickers",
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

export const diaryModel = new DiaryModel();
