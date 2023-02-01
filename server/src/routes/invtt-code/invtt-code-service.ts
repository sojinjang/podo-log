import { invttCodeModel, bookModel } from "../../db/models";
import { UserBookDTO } from "../../types";
import { createInvttCode } from "../../utils";

class InvttCodeService {
  private invttCodeModel = invttCodeModel;
  private bookModel = bookModel;

  async createInvttCode(userBookDTO: UserBookDTO) {
    const isMember = await this.bookModel.checkUserBook(userBookDTO);
    if (!isMember) {
      throw new Error(
        `Forbidden,
            403,
            "구성원이 아니라 권한이 없습니다."`
      );
    }
    const invttCode = createInvttCode();
    const invttCodeDTO = {
      bookId: userBookDTO.bookId,
      invttCode,
    };
    const result = await this.invttCodeModel.create(invttCodeDTO);
    const invttCodeResult = { ...result, invttCode };
    return invttCodeResult;
  }

  async getInvttCode(userBookDTO: UserBookDTO) {
    const isMember = await this.bookModel.checkUserBook(userBookDTO);
    if (!isMember) {
      throw new Error(
        `Forbidden,
            403,
            "구성원이 아니라 권한이 없습니다."`
      );
    }
    const bookIdDTO = { bookId: userBookDTO.bookId };
    const [result] = await this.invttCodeModel.getByBookId(bookIdDTO);
    const invttCodeData = result ? result : { message: "생성이 필요합니다." };

    return invttCodeData;
  }
}

export const invttCodeService = new InvttCodeService();
