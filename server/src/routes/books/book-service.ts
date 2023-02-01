import { bookModel, userBookModel } from "../../db/models";
import { BookIdDTO, UpdateBookDTO, CreateBookDTO, UserBookDTO, UserIdDTO } from "../../types";
import { createInvttCode } from "../../utils";

class BookService {
  private bookModel = bookModel;
  private userBookModel = userBookModel;

  async create(bookDTO: CreateBookDTO, userIdDTO: UserIdDTO) {
    const invttCodeDTO = { invttCode: createInvttCode() };

    const result = await this.bookModel.create(bookDTO, userIdDTO, invttCodeDTO);
    return result;
  }

  async getByUserId(userIdDTO: UserIdDTO) {
    const books = await this.userBookModel.getByUserId(userIdDTO);
    return books;
  }

  async pacthById(bookIdDTO: BookIdDTO, updateBookDTO: UpdateBookDTO, userIdDTO: UserIdDTO) {
    const userBookDTO: UserBookDTO = { userId: userIdDTO.userId, bookId: bookIdDTO.bookId };
    const isMember = await this.userBookModel.checkUserBook(userBookDTO);
    if (!isMember) {
      throw new Error(
        `Forbidden,
            403,
            "구성원이 아니라 권한이 없습니다."`
      );
    }

    const result = await this.bookModel.pacth(bookIdDTO, updateBookDTO);
    return result;
  }

  async outBookById(userBookDTO: UserBookDTO) {
    const result = await this.userBookModel.outBookById(userBookDTO);
    return result;
  }
}

export const bookService = new BookService();
