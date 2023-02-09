import { atom } from "recoil";

export const isDeleteModalVisibleAtom = atom<boolean>({
  key: "isDeleteModalVisibleAtom",
  default: false,
});
