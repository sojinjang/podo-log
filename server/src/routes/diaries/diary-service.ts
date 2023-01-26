import { diaryModel } from "../../db/models";
import {
  CreateDiaryDTO,
  DiaryIdDTO,
  GetDiaryDTO,
  UpdateDiaryDTO,
  UserIdDTO,
} from "../../types";

class DiaryService {
  private diaryModel = diaryModel;
  async create(diaryDTO: CreateDiaryDTO) {
    const result = await this.diaryModel.create(diaryDTO);
    return result;
  }

  async getByBookId(bookIdDTO: GetDiaryDTO) {
    const diaries = await this.diaryModel.getWithUser(bookIdDTO);
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
    return result;
  }
}

export const diaryService = new DiaryService();
