import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type Token = string | undefined;

export const accessTokenAtom = atom<Token>({
  key: "accessTokenAtom",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
