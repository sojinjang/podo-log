import React from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { post } from "src/utils/api";
import { Input, InputContainer } from "../common/Input";
import { DiaryId } from "./DetailedDiaryContainer";

interface CommentInput {
  readonly comment: string;
}

interface NewCommentProps extends DiaryId {
  parentCommentId?: 0;
}

const NewComment = ({ diaryId, parentCommentId = 0 }: NewCommentProps) => {
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
      <InputContainer className="flex-row w-full mt-6 md:mt-8 shadow-lg">
        <Input
          className="font-[notosans] w-[90%]"
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

export default NewComment;

const PostButton = tw.button` 
font-[notosans] w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;
