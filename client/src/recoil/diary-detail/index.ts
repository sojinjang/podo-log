import { selector } from "recoil";

import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { forceRefreshCommentsAtom, focusedDiaryIdAtom } from "src/recoil/diary-detail/atom";

export { focusedDiaryIdAtom, isDeleteModalVisibleAtom, deleteInfoAtom } from "./atom";

export const getComments = selector({
  key: "getComments",
  get: async ({ get }) => {
    get(forceRefreshCommentsAtom);
    const diaryId = get(focusedDiaryIdAtom);
    try {
      if (!diaryId) return;
      const { data } = await api.get(API_URL.diaryComments(diaryId));
      return data.data;
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  },
  set: ({ set }) => {
    return set(forceRefreshCommentsAtom, Math.random());
  },
});
