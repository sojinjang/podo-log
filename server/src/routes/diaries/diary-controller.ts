import { diaryService } from "./diary-service";
import { CreateDiaryDTO, LoggedRequest } from "../../types";
import asyncHandler from "../../utils/async-handler";

class DiaryController {
  private diaryService = diaryService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const bookId = parseInt(req.params.bookId);
    const { title, content } = req.body;

    const createDiaryDTO = { userId, bookId, title, content } as CreateDiaryDTO;

    const result = await this.diaryService.create(createDiaryDTO);
    res.status(200).json(result);
  });

  // getByUserId = asyncHandler(async (req: LoggedRequest, res) => {
  //   const userIdDTO: UserIdDTO = { userId: req.user.userId };

  //   const result = await this.diaryService.getByUserId(userIdDTO);
  //   res.status(200).json(result);
  // });

  // pacthById = asyncHandler(async (req: LoggedRequest, res) => {
  //   const bookId = parseInt(req.params.bookId);
  //   const { bookName, color } = req.body;

  //   let updateBookDTO: UpdateBookDTO = { bookName, color };
  //   const userIdDTO: UserIdDTO = { userId: req.user.userId };

  //   const result = await this.diaryService.pacthById({ bookId }, updateBookDTO, userIdDTO);
  //   res.status(200).json(result);
  // });

  // outBookById = asyncHandler(async (req: LoggedRequest, res) => {
  //   const bookId = parseInt(req.params.bookId);
  //   const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

  //   const result = await this.diaryService.outBookById(userBookDTO);

  //   res.status(200).json(result);
  // });
}

export const diaryController = new DiaryController();
