import React from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import Fade from "react-reveal/Fade";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { patch } from "src/utils/api";
import { Input, InputContainer } from "../common/Input";

interface CommentInput {
  readonly comment: string;
}

export interface NewCommentProps {
  parentNickname?: string;
  commentId: number;
  comment: string;
  setIsBeingEdited: (state: boolean) => void;
}

export const EditComment = ({
  parentNickname,
  commentId,
  comment,
  setIsBeingEdited,
}: NewCommentProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const { register, handleSubmit } = useForm<CommentInput>({
    mode: "onChange",
    defaultValues: {
      comment: comment,
    },
  });

  const onSubmitComment = async ({ comment }: CommentInput) => {
    try {
      await patch(API_URL.comments, String(commentId), { reply: comment }, accessToken);
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <Fade>
      <>
        {parentNickname && (
          <div className="flex text-[1.5vh] min-[390px]:text-[1.3vh]">
            <div className="font-[notosans] font-bold">{parentNickname}</div>
            <div className="font-[notosans]">님에게 답글 남기는중</div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmitComment)}>
          <InputContainer className="flex-row w-full mt-0 shadow-lg">
            <Input
              className="font-[notosans] w-[90%]"
              placeholder="댓글을 입력해주세요. (최대 150자)"
              minLength={1}
              maxLength={150}
              required
              {...register("comment")}
            />
            <CancelButton onClick={() => setIsBeingEdited(false)}>취소</CancelButton>
            <PostButton>수정</PostButton>
          </InputContainer>
        </form>
      </>
    </Fade>
  );
};

const CancelButton = tw.p` 
font-[notosans] w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-grat-1000 hover:opacity-50 ease-in duration-300
`;

const PostButton = tw.button` 
font-[notosans] w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;
