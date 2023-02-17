import { atom } from "recoil";

export interface DeleteInfo {
  id: number | undefined;
  target: "diary" | "comment" | undefined;
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
