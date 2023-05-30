import { MyStickerPack, StickerInfo, AffixedStickerInfo } from "./response";

export interface CommentInput {
  readonly comment: string;
}

export interface StickersPreview {
  [packageId: number]: StickersWithExpiry;
}

interface StickersWithExpiry extends Pick<MyStickerPack, "stickers"> {
  expiration: Date | string;
}

export type EditingStickerInfo = Omit<AffixedStickerInfo, "stickedStickerId"> &
  StickerInfo & {
    stickedStickerId: string;
  };
