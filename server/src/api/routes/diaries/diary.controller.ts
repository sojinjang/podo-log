import { DiaryService } from "../../../services";
import {
  CreateDiaryDTO,
  GetDiaryDTO,
  UpdateDiaryDTO,
  LoggedRequest,
  PageDTO,
  FileRequest,
} from "../../../types";
import asyncHandler from "../../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/api-response";
import { BadRequestError } from "../../../core/api-error";
import { Service } from "typedi";

@Service()
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  create = asyncHandler(async (req: FileRequest, res) => {
    const { userId } = req.user;
    const bookId = parseInt(req.body.bookId);
    const { title, content } = req.body;
    const picture = req.file?.key;

    const createDiaryDTO = { userId, bookId, title, content, picture } as CreateDiaryDTO;

    const messageDTO = await this.diaryService.create(createDiaryDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getByBookId = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const limit = parseInt(req.query.limit as string) || 10;
    const start = parseInt(req.query.start as string) || 1;
    const offset = start - 1;

    const bookIdDTO: GetDiaryDTO = { bookId };
    const pageDTO: PageDTO = { limit, offset };
    const messageDTO = await this.diaryService.getByBookId(bookIdDTO, pageDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getByDiaryId = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const diaryId = parseInt(req.params.diaryId);

    const messageDTO = await this.diaryService.getById({ bookId, diaryId });
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { title, content } = req.body;
    const { userId } = req.user;

    let updateDiaryDTO: UpdateDiaryDTO = { title, content };

    const messageDTO = await this.diaryService.pacthById({ diaryId }, updateDiaryDTO, {
      userId,
    });
    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  deleteById = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { userId } = req.user;

    const messageDTO = await this.diaryService.deleteById({ diaryId }, { userId });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  getStickersByDiaryId = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);

    const messageDTO = await this.diaryService.getStickersByDiaryId({ diaryId });
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  putStickers = asyncHandler(async (req: FileRequest, res) => {
    const { userId } = req.user;
    const diaryId = parseInt(req.params.diaryId);
    const stickers = req.body;

    const putStickersDTO = { userId, diaryId, stickers };
    const messageDTO = await this.diaryService.putStickers(putStickersDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  updatePicture = asyncHandler(async (req: FileRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { userId } = req.user;
    const picture = req.file?.key;
    if (!picture) throw new BadRequestError("이미지를 보내주세요.");

    const messageDTO = await this.diaryService.updateImage({ diaryId, picture }, { userId });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  deletePicture = asyncHandler(async (req: FileRequest, res) => {
    const diaryId = parseInt(req.params.diaryId);
    const { userId } = req.user;
    const messageDTO = await this.diaryService.deleteImage({ diaryId }, { userId });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });
}
