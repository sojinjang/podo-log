import { ForbiddenError, NoDataError } from "../../core/api-error";
import { packageModel } from "../../db/models";
import {
  CreatePackageControllerDTO,
  DataObj,
  PackageDTO,
  PackageIdDTO,
  UserEntity,
  UserPackageDTO,
} from "../../types";
import { checkExpiration, checkResult, compressImageUploadByKey } from "../../utils";

class PackageService {
  private packageModel = packageModel;

  async create(createPackageDTO: CreatePackageControllerDTO) {
    const { packageArr, packageName, podoPrice } = createPackageDTO;
    const stickers = await Promise.all(
      packageArr.map(async ({ key }) => compressImageUploadByKey(key, packageName))
    );

    const result = await this.packageModel.create({ packageName, podoPrice, stickers });
    const messageDTO = checkResult(result, "패키지 업로드에 성공하였습니다.");
    return messageDTO;
  }

  async buyPackage(packageIdDTO: PackageIdDTO, user: UserEntity) {
    const [stickerPckg] = await this.packageModel.getOnlyPackage(packageIdDTO);
    if (!stickerPckg) throw new NoDataError("요청한 패키지가 존재하지 않습니다.");
    if (user.grape < stickerPckg.podoPrice) throw new ForbiddenError("포도가 모자릅니다.");

    const packageDTO = {
      ...packageIdDTO,
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    };

    const result = await this.packageModel.buyPackage(packageDTO, user);
    const messageDTO = checkResult(result, "패키지 구매에 성공하였습니다.");
    return messageDTO;
  }

  async getByUserId(userIdDTO: UserPackageDTO) {
    const [myPackageIds, myPackagesTimeDic] = await checkExpiration(userIdDTO);

    if (myPackageIds.length === 0)
      return { message: "패키지 조회에 성공하였습니다.", data: [] };

    const myPackages = await this.packageModel.getPackageJoinStickersByPakcageIdArr(
      myPackageIds
    );

    const myPackagesAddDate = myPackages.map((myPackage) => {
      myPackage.expiration = myPackagesTimeDic[myPackage.packageId];
      return myPackage;
    });

    const messageDTO = { message: "패키지 조회에 성공하였습니다.", data: myPackagesAddDate };
    return messageDTO;
  }

  async getPackageInshop(userIdDTO: UserPackageDTO) {
    const [myPackageIds] = await checkExpiration(userIdDTO);

    const shopPackages = await this.packageModel.getPackageJoinStickersByPakcageIdArr(
      myPackageIds,
      false
    );

    const messageDTO = { message: "상점 패키지 조회에 성공하였습니다.", data: shopPackages };
    return messageDTO;
  }

  // async pacthById(
  //   diaryIdDTO: DiaryIdDTO,
  //   updateDiaryDTO: UpdateDiaryDTO,
  //   userIdDTO: UserIdDTO
  // ) {
  //   const [diary] = await this.packageModel.get(diaryIdDTO);
  //   if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
  //   if (diary.userId !== userIdDTO.userId)
  //     throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

  //   const result = await this.packageModel.pacth(diaryIdDTO, updateDiaryDTO);
  //   const messageDTO = checkResult(result, "일기 수정에 성공하였습니다.");
  //   return messageDTO;
  // }

  // async deleteById(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
  //   const [diary] = await this.packageModel.get(diaryIdDTO);

  //   if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
  //   if (diary.userId !== userIdDTO.userId)
  //     throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

  //   const result = await this.packageModel.deleteById(diaryIdDTO);
  //   const messageDTO = checkResult(result, "일기를 삭제하였습니다.");

  //   if (diary.picture !== "없음") imageDeleter(diary.picture);

  //   return messageDTO;
  // }

  // async updateImage(diaryIdPictureDTO: UpdateDiaryPictureDTO, userIdDTO: UserIdDTO) {
  //   const { diaryId, picture } = diaryIdPictureDTO;
  //   const [diary] = await this.packageModel.get({ diaryId });

  //   if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
  //   if (diary.userId !== userIdDTO.userId)
  //     throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

  //   const result = await this.packageModel.pacth({ diaryId }, { picture });
  //   const messageDTO = checkResult(result, "사진을 수정하였습니다.");

  //   if (diary.picture !== "없음") imageDeleter(diary.picture);

  //   return messageDTO;
  // }

  // async deleteImage(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
  //   const [diary] = await this.packageModel.get(diaryIdDTO);
  //   if (!diary) throw new NoDataError("요청한 다이어리가 존재하지 않습니다.");
  //   if (diary.userId !== userIdDTO.userId)
  //     throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

  //   if (diary.picture !== "없음") imageDeleter(diary.picture);
  //   const picture = "없음";

  //   const result = await this.packageModel.pacth(diaryIdDTO, { picture });
  //   const messageDTO = checkResult(result, "사진을 삭제하였습니다.");

  //   return messageDTO;
  // }
}

export const packageService = new PackageService();
