import { invttCodeModel, userBookModel } from "../../db/models";
import { InvttCodeDTO, UserBookDTO, UserIdDTO } from "../../types";
import { createInvttCode } from "../../utils";

class InvttCodeService {
  private invttCodeModel = invttCodeModel;
  private userBookModel = userBookModel;

  async joinBook(userIdDTO: UserIdDTO, invttCodeDTO: InvttCodeDTO) {
    const [invttCodeObj] = await this.invttCodeModel.get(invttCodeDTO);
    if (!invttCodeObj) {
      throw new Error(
        `Forbidden,
            403,
            "일치하는 초대코드가 없습니다."`
      );
    }
    const userBookDTO = { bookId: invttCodeObj.bookId, userId: userIdDTO.userId };
    const result = await this.userBookModel.joinBook(userBookDTO);

    return result;
  }

  async patchInvttCode(userBookDTO: UserBookDTO) {
    const isMember = await this.userBookModel.checkUserBook(userBookDTO);
    if (!isMember) {
      throw new Error(
        `Forbidden,
            403,
            "구성원이 아니라 권한이 없습니다."`
      );
    }
    const invttCode = createInvttCode();
    const invttCodeDTO = { invttCode };
    const bookIdDTO = { bookId: userBookDTO.bookId };

    const result = await this.invttCodeModel.patch(bookIdDTO, invttCodeDTO);
    const invttCodeResult = { ...result, invttCode };
    return invttCodeResult;
  }

  async getInvttCode(userBookDTO: UserBookDTO) {
    const isMember = await this.userBookModel.checkUserBook(userBookDTO);
    if (!isMember) {
      throw new Error(
        `Forbidden,
            403,
            "구성원이 아니라 권한이 없습니다."`
      );
    }
    const bookIdDTO = { bookId: userBookDTO.bookId };
    const [result] = await this.invttCodeModel.get(bookIdDTO);
    const invttCodeData = result ? result : { message: "생성이 필요합니다." };

    return invttCodeData;
  }
}

export const invttCodeService = new InvttCodeService();
