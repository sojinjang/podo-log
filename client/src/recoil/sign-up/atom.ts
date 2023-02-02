import { atom } from "recoil";

export type Img = string | Blob;

export const profileImgAtom = atom<Img>({
  key: "profileImgAtom",
  default: "",
});
