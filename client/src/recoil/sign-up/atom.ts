import { atom } from "recoil";

export type Img = string | ArrayBuffer | null;

export const profileImgAtom = atom<Img>({
  key: "profileImgAtom",
  default: "",
});
