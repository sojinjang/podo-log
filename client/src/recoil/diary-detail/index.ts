import { selector } from "recoil";

import { API_URL } from "src/constants/API_URL";
import { forceRefreshCommentsAtom, focusedDiaryIdAtom } from "src/recoil/diary-detail/atom";
import { accessTokenAtom } from "../token";
import * as api from "src/utils/api";

export { focusedDiaryIdAtom, isDeleteModalVisibleAtom, deleteInfoAtom } from "./atom";

export const getComments = selector({
  key: "getComments",
  get: async ({ get }) => {
    get(forceRefreshCommentsAtom);
    const diaryId = get(focusedDiaryIdAtom);
    const accessToken = get(accessTokenAtom);
    try {
      if (!diaryId) return;
      const response = await api.get(API_URL.diaryComments(diaryId), "", accessToken);
      return response.data;
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  },
  set: ({ set }) => {
    return set(forceRefreshCommentsAtom, Math.random());
  },
});
