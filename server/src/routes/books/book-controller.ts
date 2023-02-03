import { bookService } from "./book-service";
import {
  CreateBookDTO,
  LoggedRequest,
  UpdateBookDTO,
  UserBookDTO,
  UserIdDTO,
} from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";

class BookController {
  private bookService = bookService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { bookName, color } = req.body;
    const createBookDTO = { bookName, color } as CreateBookDTO;
    const userIdDTO = { userId: req.user.userId };

    const messageDTO = await this.bookService.create(createBookDTO, userIdDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getByUserId = asyncHandler(async (req: LoggedRequest, res) => {
    const userIdDTO: UserIdDTO = { userId: req.user.userId };

    const messageDTO = await this.bookService.getByUserId(userIdDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const { bookName, color } = req.body;

    let updateBookDTO: UpdateBookDTO = { bookName, color };
    const userIdDTO: UserIdDTO = { userId: req.user.userId };

    const messageDTO = await this.bookService.pacthById({ bookId }, updateBookDTO, userIdDTO);
    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  outBookById = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

    const messageDTO = await this.bookService.outBookById(userBookDTO);

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });
}

export const bookController = new BookController();
