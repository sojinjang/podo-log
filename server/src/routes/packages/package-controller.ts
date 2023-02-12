import { packageService } from "./package-service";
import { FileRequest, LoggedRequest } from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";
import { BadRequestError } from "../../core/api-error";

class PackageController {
  private packageService = packageService;

  create = asyncHandler(async (req: FileRequest, res) => {
    const { packageName } = req.body;
    const podoPrice = parseInt(req.body.podoPrice) || 1;
    const packageArr = req.files;
    if (typeof packageArr === "undefined" || packageArr.length === 0)
      throw new BadRequestError("패키지를 보내주세요.");
    const createPackageDTO = { packageName, packageArr, podoPrice };

    const messageDTO = await this.packageService.create(createPackageDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  buyPackage = asyncHandler(async (req: LoggedRequest, res) => {
    const packageId = parseInt(req.params.packageId);
    const user = req.user;

    const messageDTO = await this.packageService.buyPackage({ packageId }, user);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getMyPackage = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;

    const messageDTO = await this.packageService.getByUserId({ userId });
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getPackageInshop = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;

    const messageDTO = await this.packageService.getPackageInshop({ userId });
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

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
