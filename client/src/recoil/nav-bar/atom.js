import { atom } from "recoil";

export const activeMenuAtom = atom({
  key: "activeMenu",
  default: "diaries",
});
