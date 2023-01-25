import { bookService } from "./book-service";
import { CreateBookDTO, LoggedRequest, UpdateBookDTO, UserIdDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";

class BookController {
  private bookService = bookService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { bookName, color } = req.body;
    const createBookDTO = { bookName, color } as CreateBookDTO;
    const userBookDTO = { userId: req.user.userId };

    const result = await this.bookService.create(createBookDTO, userBookDTO);
    res.status(200).json(result);
  });

  getByUserId = asyncHandler(async (req: LoggedRequest, res) => {
    const userIdDTO: UserIdDTO = { userId: req.user.userId };

    const result = await this.bookService.getByUserId(userIdDTO);
    res.status(200).json(result);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const { bookName, color } = req.body;

    let updateBookDTO: UpdateBookDTO = { bookName, color };
    const userIdDTO: UserIdDTO = { userId: req.user.userId };

    const result = await this.bookService.pacthById({ bookId }, updateBookDTO, userIdDTO);
    res.status(200).json(result);
  });

  // deleteById = asyncHandler(async (req: LoggedRequest, res) => {
  //   const userId = req.user.userId;
  //   const result = await this.bookService.deleteById(userId);

  //   res.status(200).json(result);
  // });
}

export const bookController = new BookController();
