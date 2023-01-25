import { bookModel } from "../../db/models";
import bcrypt from "bcrypt";
import { CreateBookDTO, UserBookDTO, UserIdDTO } from "../../types";
import { BookIdDTO, UpdateBookDTO } from "./../../types/book-type.d";

class BookService {
  private bookModel = bookModel;
  async create(bookDTO: CreateBookDTO, userBookDTO: UserBookDTO) {
    const result = await this.bookModel.create(bookDTO, userBookDTO);
    return result;
  }

  async getByUserId(userIdDTO: UserIdDTO) {
    const books = await this.bookModel.getByUserId(userIdDTO);
    return books;
  }

  async pacthById(bookIdDTO: BookIdDTO, updateBookDTO: UpdateBookDTO, userIdDTO: UserIdDTO) {
    const userBookDTO: UserBookDTO = { userId: userIdDTO.userId, bookId: bookIdDTO.bookId };
    const isMember = await this.bookModel.checkUserBook(userBookDTO);

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

  // async withdrawalById(userId: number) {
  //   const userIdDTO: UserIdDTO = { userId };
  //   const result = await this.bookModel.withdrawalById(userIdDTO);
  //   return result;
  // }

  // async deleteById(userId: number) {
  //   const userIdDTO: UserIdDTO = { userId };
  //   const result = await this.bookModel.deleteById(userIdDTO);
  //   return result;
  // }
}

export const bookService = new BookService();
