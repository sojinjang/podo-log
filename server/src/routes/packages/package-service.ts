import { ForbiddenError, NoDataError } from "../../core/api-error";
import { PackageModel } from "../../db/models";
import { imageObjDeleter } from "../../middlewares";
import {
  CreatePackageControllerDTO,
  PackageIdDTO,
  UserEntity,
  UserPackageDTO,
  checkExpirationReducer,
  checkExpirationReturn,
} from "../../types";
import { buildImgLocation, checkResult, compressImageUploadByKey } from "../../utils";
import { Service } from "typedi";

@Service()
export class PackageService {
  constructor(private packageModel: PackageModel) {}

  async create(createPackageDTO: CreatePackageControllerDTO) {
    const { packageArr, packageName, podoPrice } = createPackageDTO;
    const packageNameKey = packageName.replace(/([^\w\.]*)/g, "_");

    const stickers = await Promise.all(
      packageArr.map(async ({ key }) => compressImageUploadByKey(key, packageNameKey))
    );

    const result = await this.packageModel.create({ packageName, podoPrice, stickers });
    const messageDTO = checkResult(result, "패키지 업로드에 성공하였습니다.");
    return messageDTO;
  }

  async buyPackage(packageIdDTO: PackageIdDTO, user: UserEntity) {
    const [stickerPckg] = await this.packageModel.getOnlyPackage(packageIdDTO);
    if (!stickerPckg) throw new NoDataError("요청한 패키지가 존재하지 않습니다.");
    if (user.grape < stickerPckg.podoPrice) throw new ForbiddenError("포도가 모자릅니다.");

    const expiration =
      stickerPckg.podoPrice !== 0 ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) : null;
    const packageDTO = {
      ...packageIdDTO,
      expiration,
    };

    const result = await this.packageModel.buyPackage(packageDTO, user);
    const messageDTO = checkResult(result, "패키지 구매에 성공하였습니다.");
    return messageDTO;
  }

  async getStickersByPackageId(packageIdDTO: PackageIdDTO) {
    const stikers = await this.packageModel.getStickers(packageIdDTO);
    const data = buildImgLocation(stikers, "stickerImg");

    const messageDTO = { message: "패키지 조회에 성공하였습니다.", data };
    return messageDTO;
  }

  async getByUserId(userIdDTO: UserPackageDTO) {
    const [myPackageIds, myPackagesTimeDic] = await this.checkExpiration(userIdDTO);

    if (myPackageIds.length === 0)
      return { message: "패키지 조회에 성공하였습니다.", data: [] };

    const myPackages = await this.packageModel.getPackageJoinStickersByPakcageIdArr(
      myPackageIds
    );

    const myPackagesAddDate = myPackages.map((myPackage) => {
      myPackage.expiration = myPackagesTimeDic[myPackage.packageId];
      myPackage.stickers = buildImgLocation(myPackage.stickers, "stickerImg");

      return myPackage;
    });

    const messageDTO = { message: "패키지 조회에 성공하였습니다.", data: myPackagesAddDate };
    return messageDTO;
  }

  async getPackageInshop(userIdDTO: UserPackageDTO) {
    const [myPackageIds] = await this.checkExpiration(userIdDTO);

    const shopPackages = await this.packageModel.getPackageJoinStickersByPakcageIdArr(
      myPackageIds,
      false
    );

    const shopPackagesAddImgDomain = shopPackages.map((pckg) => {
      pckg.stickers = buildImgLocation(pckg.stickers, "stickerImg");

      return pckg;
    });

    const messageDTO = {
      message: "상점 패키지 조회에 성공하였습니다.",
      data: shopPackagesAddImgDomain,
    };
    return messageDTO;
  }

  async deletePackage(packageIdDTO: PackageIdDTO) {
    const stikers = await this.packageModel.getStickers(packageIdDTO);

    if (stikers.length !== 0) {
      const stickerUrls = stikers.map(({ stickerImg }) => ({ Key: stickerImg }));
      imageObjDeleter(stickerUrls);
    }

    const result = await this.packageModel.deletePackage(packageIdDTO);
    const messageDTO = checkResult(result, "패키지를 삭제하였습니다.");

    return messageDTO;
  }

  async checkExpiration(userIdDTO: UserPackageDTO): Promise<checkExpirationReturn> {
    const myPackagesInquiry = await this.packageModel.getOnlyUserPackage(userIdDTO);

    const [expireIds, myPackageIds, myPackagesTimeDic] = myPackagesInquiry.reduce(
      ([expireIds, ids, timeDic], cur) => {
        const packageId: number = cur.packageId;
        //cur.expiration 가 없으면 기본 스티커
        if (!cur.expiration) {
          timeDic[packageId] = "free";
          ids.push(packageId);
        } else {
          const diffdays = cur.expiration.getTime() - Date.now();
          if (diffdays < 0) expireIds.push(packageId);
          else {
            timeDic[packageId] = cur.expiration;
            ids.push(packageId);
          }
        }
        return [expireIds, ids, timeDic];
      },
      [[], [], {}] as checkExpirationReducer
    );

    if (expireIds.length > 0) this.packageModel.deleteUserPackageByPackageIdArr(expireIds); //기다릴 필요 없을듯

    return [myPackageIds, myPackagesTimeDic];
  }
}
