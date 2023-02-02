import { bookService } from "./book-service";
import {
  CreateBookDTO,
  LoggedRequest,
  UpdateBookDTO,
  UserBookDTO,
  UserIdDTO,
} from "../../types";
import asyncHandler from "../../utils/async-handler";

class BookController {
  private bookService = bookService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { bookName, color } = req.body;
    const createBookDTO = { bookName, color } as CreateBookDTO;
    const userIdDTO = { userId: req.user.userId };

    const result = await this.bookService.create(createBookDTO, userIdDTO);
    return res.status(200).json(result);
  });

  getByUserId = asyncHandler(async (req: LoggedRequest, res) => {
    const userIdDTO: UserIdDTO = { userId: req.user.userId };

    const result = await this.bookService.getByUserId(userIdDTO);
    return res.status(200).json(result);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const { bookName, color } = req.body;

    let updateBookDTO: UpdateBookDTO = { bookName, color };
    const userIdDTO: UserIdDTO = { userId: req.user.userId };

    const result = await this.bookService.pacthById({ bookId }, updateBookDTO, userIdDTO);
    return res.status(200).json(result);
  });

  outBookById = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

    const result = await this.bookService.outBookById(userBookDTO);

    return res.status(200).json(result);
  });
}

export const bookController = new BookController();
