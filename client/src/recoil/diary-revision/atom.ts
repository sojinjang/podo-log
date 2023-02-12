import { atom } from "recoil";

export type Img = string | Blob;

export const diaryRevisionImgAtom = atom<Img>({
  key: "diaryRevisionImgAtom",
  default: "",
});
