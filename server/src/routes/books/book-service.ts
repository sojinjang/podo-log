import { bookModel } from "../../db/models";
import bcrypt from "bcrypt";
import { CreateBookDTO, UserBookDTO, UserIdDTO } from "../../types";

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

  // async pacthById(exUser: UserEntity, updatebookDTO: UpdatebookDTO) {
  //   const { userId, password: exHashedPassword } = exUser;
  //   const { password, newPassword } = updatebookDTO;

  //   if (password && exHashedPassword) {
  //     const isPasswordCorrect = await bcrypt.compare(password, exHashedPassword);
  //     if (!isPasswordCorrect) {
  //       throw new Error(
  //         `UNAUTHORIZED,
  //           401,
  //           "비밀번호가 일치하지 않습니다."`
  //       );
  //     }
  //     if (newPassword) {
  //       if (password === newPassword)
  //         throw new Error("400, 새로운 비밀번호와 현재 비밀번호가 같습니다.");

  //       const newHashedPassword = await bcrypt.hash(newPassword, 10);
  //       updatebookDTO.password = newHashedPassword;
  //       delete updatebookDTO.newPassword;
  //     }
  //   }

  //   const userIdDTO = { userId };
  //   const result = await this.bookModel.pacth(userIdDTO, updatebookDTO);
  //   return result;
  // }

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
