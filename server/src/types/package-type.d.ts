import { DataObj } from "./etc-type";
import { S3File } from "./login-type";

export interface CreatePackageControllerDTO {
  packageName: string;
  packageArr: S3File[];
  podoPrice?: number;
}

interface Sticker {
  stickerName: string;
  stickerImg: string;
}

export interface CreatePackageServiceDTO {
  packageName: string;
  stickers: (Sticker | undefined)[];
  podoPrice?: number;
}

export interface PackageIdDTO {
  packageId: number;
}
export interface PackageDTO {
  packageId: number;
  packageName: string;
  podoPrice: number;
}

export interface UserPackageDTO {
  packageId?: number;
  userId?: number;
  expiration?: date;
}
