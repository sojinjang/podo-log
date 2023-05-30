import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Token } from "src/@types/response";

const { persistAtom } = recoilPersist();

export const ACCESS_TOKEN_KEY = "accessTokenAtom";

export const accessTokenAtom = atom<Token>({
  key: ACCESS_TOKEN_KEY,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
