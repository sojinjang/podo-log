import { diaryService } from "./diary-service";
import {
  CreateDiaryDTO,
  GetDiaryDTO,
  UpdateDiaryDTO,
  LoggedRequest,
  PageDTO,
  FileRequest,
} from "../../types";
import asyncHandler from "../../utils/async-handler";

class DiaryController {
  private diaryService = diaryService;

  create = asyncHandler(async (req: FileRequest, res) => {
    const { userId } = req.user;
    const bookId = parseInt(req.body.bookId);
    const { title, content } = req.body;
    const picture = req.file?.location;

    const createDiaryDTO = { userId, bookId, title, content, picture } as CreateDiaryDTO;

    const result = await this.diaryService.create(createDiaryDTO);
    res.status(200).json(result);
  });

  getByBookId = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const limit = parseInt(req.query.limit as string) || 10;
    const start = parseInt(req.query.start as string) || 1;
    const offset = start - 1;

    const bookIdDTO: GetDiaryDTO = { bookId };
    const pageDTO: PageDTO = { limit, offset };
    const result = await this.diaryService.getByBookId(bookIdDTO, pageDTO);
    res.status(200).json(result);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { title, content } = req.body;
    const { userId } = req.user;

    let updateDiaryDTO: UpdateDiaryDTO = { title, content };

    const result = await this.diaryService.pacthById({ diaryId }, updateDiaryDTO, { userId });
    res.status(200).json(result);
  });

  deleteById = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { userId } = req.user;

    const result = await this.diaryService.deleteById({ diaryId }, { userId });

    res.status(200).json(result);
  });

  updatePicture = asyncHandler(async (req: FileRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { userId } = req.user;
    const picture = req.file?.location;
    if (!picture) throw new Error("요청 오류, 이미지 없음");

    const result = await this.diaryService.updateImage({ diaryId, picture }, { userId });

    res.status(200).json(result);
  });

  deletePicture = asyncHandler(async (req: FileRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { userId } = req.user;
    const result = await this.diaryService.deleteImage({ diaryId }, { userId });

    res.status(200).json(result);
  });
}

export const diaryController = new DiaryController();
