import { ForbiddenError, NoDataError } from "../core/api-error";
import { DiaryModel } from "../models";
import { imageDeleter } from "../api/middlewares";
import {
  CreateDiaryDTO,
  DiaryIdDTO,
  GetDiaryDTO,
  PageDTO,
  PutStickersDTO,
  UpdateDiaryDTO,
  UpdateDiaryPictureDTO,
  UserIdDTO,
} from "../types";
import { checkResult, buildImgLocation } from "../utils";
import { Service } from "typedi";

@Service()
export class DiaryService {
  constructor(private diaryModel: DiaryModel) {}

  async create(diaryDTO: CreateDiaryDTO) {
    const result = await this.diaryModel.create(diaryDTO);
    const messageDTO = checkResult(result, "일기쓰기에 성공하였습니다.");
    return messageDTO;
  }

  async getByBookId(bookIdDTO: GetDiaryDTO, pageDTO: PageDTO) {
    const diaries = await this.diaryModel.getWithUserStickers(bookIdDTO, pageDTO);

    const data = diaries.map((dairy) => {
      const stickers = dairy.stickers
        ? buildImgLocation(dairy.stickers, "stickerImg")
        : undefined;
      const dairyAddImg = buildImgLocation(dairy, "picture", "profile");
      return { ...dairyAddImg, stickers };
    });

    const messageDTO = { message: "일기 조회에 성공하였습니다.", data };
    return messageDTO;
  }

  async getById(getDiaryDTO: GetDiaryDTO) {
    const [diary] = await this.diaryModel.get(getDiaryDTO);
    if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");

    const data = buildImgLocation(diary, "picture");

    const messageDTO = { message: "일기 조회에 성공하였습니다.", data };
    return messageDTO;
  }

  async pacthById(
    diaryIdDTO: DiaryIdDTO,
    updateDiaryDTO: UpdateDiaryDTO,
    userIdDTO: UserIdDTO
  ) {
    const [diary] = await this.diaryModel.get(diaryIdDTO);
    if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
    if (diary.userId !== userIdDTO.userId)
      throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

    const result = await this.diaryModel.pacth(diaryIdDTO, updateDiaryDTO);
    const messageDTO = checkResult(result, "일기 수정에 성공하였습니다.");
    return messageDTO;
  }

  async deleteById(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
    const [diary] = await this.diaryModel.get(diaryIdDTO);

    if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
    if (diary.userId !== userIdDTO.userId)
      throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

    const result = await this.diaryModel.deleteById(diaryIdDTO);
    const messageDTO = checkResult(result, "일기를 삭제하였습니다.");

    if (diary.picture !== "없음") imageDeleter(diary.picture);

    return messageDTO;
  }

  async getStickersByDiaryId(diaryIdDTO: DiaryIdDTO) {
    const stickers = await this.diaryModel.getStickersByDiaryId(diaryIdDTO);

    const data = buildImgLocation(stickers, "stickerImg");

    const messageDTO = { message: "일기 조회에 성공하였습니다.", data };
    return messageDTO;
  }

  async putStickers(putStickersDTO: PutStickersDTO) {
    const { userId, diaryId, stickers } = putStickersDTO;

    const stickedStickers = stickers.map((sticker) => ({ ...sticker, userId, diaryId }));

    const result = await this.diaryModel.putStickers(stickedStickers);
    const stickersInDairy = await this.diaryModel.getStickersByDiaryId({ diaryId });
    const data = buildImgLocation(stickersInDairy, "stickerImg");

    const messageDTO = checkResult(result, "스티커를 붙였습니다.");

    messageDTO.data = data;

    return messageDTO;
  }

  async updateImage(diaryIdPictureDTO: UpdateDiaryPictureDTO, userIdDTO: UserIdDTO) {
    const { diaryId, picture } = diaryIdPictureDTO;
    const [diary] = await this.diaryModel.get({ diaryId });

    if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
    if (diary.userId !== userIdDTO.userId)
      throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

    const result = await this.diaryModel.pacth({ diaryId }, { picture });
    const messageDTO = checkResult(result, "사진을 수정하였습니다.");

    if (diary.picture !== "없음") imageDeleter(diary.picture);

    return messageDTO;
  }

  async deleteImage(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
    const [diary] = await this.diaryModel.get(diaryIdDTO);
    if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
    if (diary.userId !== userIdDTO.userId)
      throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

    if (diary.picture !== "없음") imageDeleter(diary.picture);
    const picture = "없음";

    const result = await this.diaryModel.pacth(diaryIdDTO, { picture });
    const messageDTO = checkResult(result, "사진을 삭제하였습니다.");

    return messageDTO;
  }
}
