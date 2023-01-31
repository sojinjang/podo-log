import { diaryModel } from "../../db/models";
import { imageDeleter } from "../../middlewares";
import {
  CreateDiaryDTO,
  DiaryIdDTO,
  GetDiaryDTO,
  PageDTO,
  UpdateDiaryDTO,
  UpdateDiaryPictureDTO,
  UserIdDTO,
} from "../../types";

class DiaryService {
  private diaryModel = diaryModel;
  async create(diaryDTO: CreateDiaryDTO) {
    const result = await this.diaryModel.create(diaryDTO);
    return result;
  }

  async getByBookId(bookIdDTO: GetDiaryDTO, pageDTO: PageDTO) {
    const diaries = await this.diaryModel.getWithUser(bookIdDTO, pageDTO);
    return diaries;
  }

  async pacthById(
    diaryIdDTO: DiaryIdDTO,
    updateDiaryDTO: UpdateDiaryDTO,
    userIdDTO: UserIdDTO
  ) {
    const [diary] = await this.diaryModel.get(diaryIdDTO);
    if (!diary)
      throw new Error(
        `Forbidden,
          404,
          "요청한 다이어리가 존재하지 않습니다."`
      );
    if (diary.userId !== userIdDTO.userId) {
      throw new Error(
        `Forbidden,
            403,
            "작성자가 아니라 권한이 없습니다."`
      );
    }

    const result = await this.diaryModel.pacth(diaryIdDTO, updateDiaryDTO);
    return result;
  }

  async deleteById(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
    const [diary] = await this.diaryModel.get(diaryIdDTO);
    if (!diary)
      throw new Error(
        `Forbidden,
          404,
          "요청한 다이어리가 존재하지 않습니다."`
      );
    if (diary.userId !== userIdDTO.userId) {
      throw new Error(
        `Forbidden,
            403,
            "작성자가 아니라 권한이 없습니다."`
      );
    }
    const result = await this.diaryModel.deleteById(diaryIdDTO);
    if (diary.picture !== "없음") imageDeleter(diary.picture);
    return result;
  }

  async updateImage(diaryIdPictureDTO: UpdateDiaryPictureDTO, userIdDTO: UserIdDTO) {
    const { diaryId, picture } = diaryIdPictureDTO;
    const [diary] = await this.diaryModel.get({ diaryId });
    if (!diary)
      throw new Error(
        `Forbidden,
        404,
        "요청한 다이어리가 존재하지 않습니다."`
      );
    if (diary.userId !== userIdDTO.userId) {
      throw new Error(
        `Forbidden,
          403,
          "작성자가 아니라 권한이 없습니다."`
      );
    }

    const result = await this.diaryModel.pacth({ diaryId }, { picture });
    if (diary.picture !== "없음") imageDeleter(diary.picture);
    return result;
  }

  async deleteImage(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
    const [diary] = await this.diaryModel.get(diaryIdDTO);
    if (!diary)
      throw new Error(
        `Forbidden,
        404,
        "요청한 다이어리가 존재하지 않습니다."`
      );
    if (diary.userId !== userIdDTO.userId) {
      throw new Error(
        `Forbidden,
          403,
          "작성자가 아니라 권한이 없습니다."`
      );
    }

    if (diary.picture !== "없음") imageDeleter(diary.picture);
    const picture = "없음";

    const result = await this.diaryModel.pacth(diaryIdDTO, { picture });
    return result;
  }
}

export const diaryService = new DiaryService();
