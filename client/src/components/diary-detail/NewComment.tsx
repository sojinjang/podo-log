import React from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { post } from "src/utils/api";
import { Input, InputContainer } from "../common/Input";
import { DiaryId } from "../../pages/DiaryDetail";

interface CommentInput {
  readonly comment: string;
}

export interface NewCommentProps extends DiaryId {
  parentCommentId?: number;
}

export const NewComment = ({ diaryId, parentCommentId = 0 }: NewCommentProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const { register, handleSubmit } = useForm<CommentInput>({ mode: "onChange" });

  const onSubmitComment = async ({ comment }: CommentInput) => {
    try {
      await post(API_URL.comments, { diaryId, parentCommentId, reply: comment }, accessToken);
      window.location.reload();
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
