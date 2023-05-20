import { useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";

import { CommentInput } from "src/@types/diary";
import { focusedDiaryIdAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { getComments } from "src/recoil/diary-detail";
import * as G from "src/styles/Common";
import * as S from "src/styles/DiaryDetail";

export interface NewCommentProps {
  changeReplyState?: () => void;
  parentCommentId?: number;
}

export const NewComment = ({ changeReplyState, parentCommentId = 0 }: NewCommentProps) => {
  const diaryId = useRecoilValue(focusedDiaryIdAtom);
  const reloadComments = useSetRecoilState(getComments);
  const { register, handleSubmit, setValue } = useForm<CommentInput>({ mode: "onSubmit" });

  const onSubmitComment = async ({ comment }: CommentInput) => {
    try {
      await api.post(API_URL.comments, { diaryId, parentCommentId, reply: comment });
      reloadComments(1);
      setValue("comment", "");
      if (changeReplyState) changeReplyState();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitComment)}>
      <G.InputContainer className="flex-row w-full mt-0 shadow-lg">
        <G.Input
          className="font-sans w-[90%]"
          placeholder="댓글을 입력해주세요. (최대 150자)"
          minLength={1}
          maxLength={150}
          required
          {...register("comment")}
        />
        <S.PostButton>등록</S.PostButton>
      </G.InputContainer>
    </form>
  );
};
