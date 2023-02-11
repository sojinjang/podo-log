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
