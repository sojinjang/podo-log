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

  // async outBookById(userBookDTO: UserBookDTO) {
  //   const result = await this.diaryModel.outBookById(userBookDTO);
  //   return result;
  // }
}

export const diaryService = new DiaryService();
