import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { getComments } from "src/recoil/diary-detail";
import { NewComment } from "./NewComment";
import { CommentsFamily } from "./CommentsFamily";

export interface CommentType {
  commentId: number;
  userId: number;
  nickname: string;
  profile: string;
  parentCommentId: number;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentFamType {
  parentComment: CommentType;
  reComments?: CommentType[];
}

export const CommentSection = () => {
  const comments = useRecoilValue<CommentFamType[]>(getComments);
  const reloadComments = useSetRecoilState(getComments);
  const reCommentsSum = comments.reduce((accumulator, currentObj) => {
    if (currentObj.reComments) return accumulator + currentObj.reComments.length;
    return accumulator;
  }, 0);

  useEffect(() => {
    reloadComments(1);
  }, []);

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

const Divider = tw.hr`
h-[2px] bg-[#C7C7C7] mx-auto
`;

const NumCommentsWrapper = tw.div`
mt-2 md:mt-3 mb-1 md:mb-2 mx-auto text-[1.8vh]
`;
