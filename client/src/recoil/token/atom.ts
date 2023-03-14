import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type Token = string | undefined;
export const ACCESS_TOKEN_KEY = "accessTokenAtom";

export const accessTokenAtom = atom<Token>({
  key: ACCESS_TOKEN_KEY,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
