import { InvttCodeModel, UserBookModel } from "../../db/models";
import { InvttCodeDTO, UserBookDTO, UserIdDTO } from "../../types";
import { checkResult, createInvttCode } from "../../utils";
import { NoDataError, ForbiddenError } from "./../../core/api-error";
import { Service } from "typedi";

@Service()
export class InvttCodeService {
  constructor(private invttCodeModel: InvttCodeModel, private userBookModel: UserBookModel) {}
  async joinBook(userIdDTO: UserIdDTO, invttCodeDTO: InvttCodeDTO) {
    const [invttCodeObj] = await this.invttCodeModel.get(invttCodeDTO);
    if (!invttCodeObj) throw new NoDataError("일치하는 초대코드가 없습니다.");

    const userBookDTO = { bookId: invttCodeObj.bookId, userId: userIdDTO.userId };
    const result = await this.userBookModel.joinBook(userBookDTO);
    const messageDTO = checkResult(result, "일기장에 참여하였습니다.");

    return messageDTO;
  }

  async patchInvttCode(userBookDTO: UserBookDTO) {
    const isMember = await this.userBookModel.checkUserBook(userBookDTO);
    if (!isMember) throw new ForbiddenError("구성원이 아니라 권한이 없습니다.");

    const invttCode = createInvttCode();
    const invttCodeDTO = { invttCode };
    const bookIdDTO = { bookId: userBookDTO.bookId };

    const result = await this.invttCodeModel.patch(bookIdDTO, invttCodeDTO);
    const messageDTO = checkResult(result, "초대코드를 갱신하였습니다.");

    messageDTO.data = { invttCode };
    return messageDTO;
  }

  async getInvttCode(userBookDTO: UserBookDTO) {
    const isMember = await this.userBookModel.checkUserBook(userBookDTO);
    if (!isMember) throw new ForbiddenError("구성원이 아니라 권한이 없습니다.");

    const bookIdDTO = { bookId: userBookDTO.bookId };

    const [invttCodeData] = await this.invttCodeModel.get(bookIdDTO);
    if (!invttCodeData) throw new NoDataError("초대 코드 생성이 필요합니다.");

    const messageDTO = { message: "초대코드 조회에 성공하였습니다.", data: invttCodeData };

    return messageDTO;
  }
}
