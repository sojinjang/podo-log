import { atom } from "recoil";

export const selectedColorAtom = atom({
  key: "selectedColor",
  default: "000000",
});

export const bookTitleAtom = atom({
  key: "bookTitle",
  default: "",
});
