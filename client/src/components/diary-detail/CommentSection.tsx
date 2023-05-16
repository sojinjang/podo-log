import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { CommentFamType } from "src/@types/response";
import { getComments } from "src/recoil/diary-detail";
import { NewComment } from "./NewComment";
import { CommentsFamily } from "./CommentsFamily";

interface CommentSectionProps {
  updateNumComments: (newNumComments: number) => void;
}

export const CommentSection = ({ updateNumComments }: CommentSectionProps) => {
  const comments = useRecoilValue<CommentFamType[]>(getComments);
  const reloadComments = useSetRecoilState(getComments);
  const reCommentsSum = comments.reduce((accumulator, currentObj) => {
    if (currentObj.reComments) return accumulator + currentObj.reComments.length;
    return accumulator;
  }, 0);

  useEffect(() => {
    reloadComments(1);
  }, []);
  useEffect(() => {
    if (comments.length) updateNumComments(comments.length + reCommentsSum);
  }, [comments]);

  return (
    <div className="pb-6 md:pb-8">
      <Divider />
      <NumCommentsWrapper>댓글 {comments.length + reCommentsSum}</NumCommentsWrapper>
      {comments.map((commentsFam) => {
        return (
          <CommentsFamily
            commentsFam={commentsFam}
            key={commentsFam.parentComment?.commentId}
          />
        );
      })}
      <div className="h-[2vh]" />
      <NewComment />
    </div>
  );
};

export const Divider = tw.hr`
h-[2px] bg-[#C7C7C7] mx-auto
`;

export const NumCommentsWrapper = tw.div`
mt-2 md:mt-3 mb-1 md:mb-2 mx-auto text-[1.8vh]
`;
