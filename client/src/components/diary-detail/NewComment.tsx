import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";

import { focusedDiaryIdAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { Input, InputContainer } from "../common/Input";
import { getComments } from "src/recoil/diary-detail";

interface CommentInput {
  readonly comment: string;
}

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
      <InputContainer className="flex-row w-full mt-0 shadow-lg">
        <Input
          className="font-sans w-[90%]"
          placeholder="댓글을 입력해주세요. (최대 150자)"
          minLength={1}
          maxLength={150}
          required
          {...register("comment")}
        />
        <PostButton>등록</PostButton>
      </InputContainer>
    </form>
  );
};

const PostButton = tw.button` 
font-sans w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;
