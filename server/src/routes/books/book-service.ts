import { ForbiddenError } from "../../core/api-error";
import { bookModel, userBookModel } from "../../db/models";
import { BookIdDTO, UpdateBookDTO, CreateBookDTO, UserBookDTO, UserIdDTO } from "../../types";
import { checkResult, createInvttCode } from "../../utils";

class BookService {
  private bookModel = bookModel;
  private userBookModel = userBookModel;

  async create(bookDTO: CreateBookDTO, userIdDTO: UserIdDTO) {
    const invttCodeDTO = { invttCode: createInvttCode() };

    const result = await this.bookModel.create(bookDTO, userIdDTO, invttCodeDTO);
    const messageDTO = checkResult(result, "일기장 생성에 성공하였습니다.");
    return messageDTO;
  }

  async getByUserId(userIdDTO: UserIdDTO) {
    const books = await this.userBookModel.getByUserId(userIdDTO);
    const messageDTO = { message: "일기장 조회에 성공하였습니다.", data: books };

    return messageDTO;
  }

  async getMembers(userBookDTO: UserBookDTO) {
    const members = await this.userBookModel.getMembers({ bookId: userBookDTO.bookId });
    members.map((member) => {
      member.isMe = member.userId === userBookDTO.userId;
      return member;
    });
    const messageDTO = { message: "일기장 멤버 조회에 성공하였습니다.", data: members };

    return messageDTO;
  }

  async pacthById(bookIdDTO: BookIdDTO, updateBookDTO: UpdateBookDTO) {
    const result = await this.bookModel.pacth(bookIdDTO, updateBookDTO);
    const messageDTO = checkResult(result, "일기장 수정에 성공하였습니다.");
    return messageDTO;
  }

  async outBookById(userBookDTO: UserBookDTO) {
    const result = await this.userBookModel.outBookById(userBookDTO);
    const messageDTO = checkResult(result, "일기장에서 퇴장하였습니다.");

    return messageDTO;
  }
}

export const bookService = new BookService();
