import { packageService } from "./package-service";
import { CreatePackageControllerDTO, FileRequest } from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";
import { BadRequestError } from "../../core/api-error";

class PackageController {
  private packageService = packageService;

  create = asyncHandler(async (req: FileRequest, res) => {
    const { packageName } = req.body;
    const podoPrice = parseInt(req.body.podoPrice) || 0;
    const packageArr = req.files;
    if (typeof packageArr === "undefined" || packageArr.length === 0)
      throw new BadRequestError("패키지를 보내주세요.");
    const createPackageDTO = { packageName, packageArr, podoPrice };

    const messageDTO = await this.packageService.create(createPackageDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  // getByBookId = asyncHandler(async (req: LoggedRequest, res) => {
  //   const bookId = parseInt(req.params.bookId);
  //   const limit = parseInt(req.query.limit as string) || 10;
  //   const start = parseInt(req.query.start as string) || 1;
  //   const offset = start - 1;

  //   const bookIdDTO: GetDiaryDTO = { bookId };
  //   const pageDTO: PageDTO = { limit, offset };
  //   const messageDTO = await this.packageService.getByBookId(bookIdDTO, pageDTO);
  //   return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  // });

  // pacthById = asyncHandler(async (req: LoggedRequest, res) => {
  //   const diaryId = parseInt(req.params.diaryId);
  //   const { title, content } = req.body;
  //   const { userId } = req.user;

  //   let updateDiaryDTO: UpdateDiaryDTO = { title, content };

  //   const messageDTO = await this.packageService.pacthById({ diaryId }, updateDiaryDTO, {
  //     userId,
  //   });
  //   return new SuccessMsgResponse(messageDTO.message).send(res);
  // });

  // deleteById = asyncHandler(async (req: LoggedRequest, res) => {
  //   const diaryId = parseInt(req.params.diaryId);
  //   const { userId } = req.user;

  //   const messageDTO = await this.packageService.deleteById({ diaryId }, { userId });

  //   return new SuccessMsgResponse(messageDTO.message).send(res);
  // });

  // updatePicture = asyncHandler(async (req: FileRequest, res) => {
  //   const diaryId = parseInt(req.params.diaryId);
  //   const { userId } = req.user;
  //   const picture = req.file?.key;
  //   if (!picture) throw new BadRequestError("이미지를 보내주세요.");

  //   const messageDTO = await this.packageService.updateImage({ diaryId, picture }, { userId });

  //   return new SuccessMsgResponse(messageDTO.message).send(res);
  // });

  // deletePicture = asyncHandler(async (req: FileRequest, res) => {
  //   const diaryId = parseInt(req.params.diaryId);
  //   const { userId } = req.user;
  //   const messageDTO = await this.packageService.deleteImage({ diaryId }, { userId });

  //   return new SuccessMsgResponse(messageDTO.message).send(res);
  // });
}

export const packageController = new PackageController();
