import { atom } from "recoil";
import { StickerInfo } from "src/components/diary-detail/StickerSection";

export interface DeleteInfo {
  id: number | undefined;
  target: "diary" | "comment" | undefined;
}

export interface MoveableStickerInfo extends StickerInfo {
  uniqueId: string;
  x: number;
  y: number;
}

export const isDeleteModalVisibleAtom = atom<boolean>({
  key: "isDeleteModalVisibleAtom",
  default: false,
});

export const deleteInfoAtom = atom<DeleteInfo>({
  key: "deleteInfoAtom",
  default: {
    id: undefined,
    target: undefined,
  },
});

export const selectedStickersAtom = atom<MoveableStickerInfo[]>({
  key: "selectedStickersAtom",
  default: [],
});
