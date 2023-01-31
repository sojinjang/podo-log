import { atom } from "recoil";

export type Token = string | undefined;

export const accessTokenAtom = atom<Token>({
  key: "accessTokenAtom",
  default: undefined,
});
