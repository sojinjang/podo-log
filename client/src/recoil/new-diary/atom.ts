import { atom } from "recoil";

export type Img = string | Blob;

export const diaryImgAtom = atom<Img>({
  key: "diaryImgAtom",
  default: "",
});
