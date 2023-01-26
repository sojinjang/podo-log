import { diaryModel } from "../../db/models";
import { CreateDiaryDTO } from "../../types";

class DiaryService {
  private diaryModel = diaryModel;
  async create(diaryDTO: CreateDiaryDTO) {
    const result = await this.diaryModel.create(diaryDTO);
    return result;
  }

  // async getByUserId(userIdDTO: UserIdDTO) {
  //   const books = await this.diaryModel.getByUserId(userIdDTO);
  //   return books;
  // }

  // async pacthById(bookIdDTO: BookIdDTO, updateBookDTO: UpdateBookDTO, userIdDTO: UserIdDTO) {
  //   const userBookDTO: UserBookDTO = { userId: userIdDTO.userId, bookId: bookIdDTO.bookId };
  //   const isMember = await this.diaryModel.checkUserBook(userBookDTO);
  //   if (!isMember) {
  //     throw new Error(
  //       `Forbidden,
  //           403,
  //           "구성원이 아니라 권한이 없습니다."`
  //     );
  //   }

  //   const result = await this.diaryModel.pacth(bookIdDTO, updateBookDTO);
  //   return result;
  // }

  // async outBookById(userBookDTO: UserBookDTO) {
  //   const result = await this.diaryModel.outBookById(userBookDTO);
  //   return result;
  // }
}

export const diaryService = new DiaryService();
