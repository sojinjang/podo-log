import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface DeleteInfo {
  id: number | undefined;
  target: "diary" | "comment" | undefined;
}

export const focusedDiaryIdAtom = atom<number>({
  key: "focusedDiaryIdAtom",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

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
