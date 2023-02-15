import { packageService } from "./package-service";
import { FileRequest, LoggedRequest } from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";
import { BadRequestError } from "../../core/api-error";

class PackageController {
  private packageService = packageService;

  create = asyncHandler(async (req: FileRequest, res) => {
    const { packageName } = req.body;
    const podoPrice = parseInt(req.body.podoPrice ?? 1);
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

  getStickersByPackageId = asyncHandler(async (req: LoggedRequest, res) => {
    const packageId = parseInt(req.params.packageId);

    const messageDTO = await this.packageService.getStickersByPackageId({ packageId });
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

  deletePackage = asyncHandler(async (req: LoggedRequest, res) => {
    const packageId = parseInt(req.params.packageId);

    const messageDTO = await this.packageService.deletePackage({ packageId });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });
}

export const packageController = new PackageController();
