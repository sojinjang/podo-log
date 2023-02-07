import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import { DiaryId } from "./DetailedDiaryContainer";
import { useDidMountEffect } from "src/utils/hooks";
import { NewComment } from "./NewComment";
import { Comment, CommentReply } from "./Comment";
import { ReplyComment } from "./ReplyComment";

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

interface CommentFamType {
  parentComment: CommentType;
  reComments?: CommentType[];
}

export const CommentSection = ({ diaryId }: DiaryId) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [commentsFamArr, setCommentsFamArr] = useState<CommentFamType[]>([]);
  const reCommentsSum = commentsFamArr.reduce((accumulator, currentObj) => {
    if (currentObj.reComments) return accumulator + currentObj.reComments.length;
    return accumulator;
  }, 0);

  const getComments = async () => {
    try {
      const response = await get(API_URL.diaryComments(diaryId), "", accessToken);
      setCommentsFamArr(response.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useDidMountEffect(getComments, []);

  return (
    <div className="pb-6 md:pb-8">
      <Divider />
      <NumCommentsWrapper>댓글 {commentsFamArr.length + reCommentsSum}</NumCommentsWrapper>
      {commentsFamArr.map((commentsFam) => {
        return (
          <React.Fragment key={commentsFam.parentComment?.commentId}>
            <Comment data={commentsFam.parentComment} />
            {commentsFam.reComments?.map((recomment) => {
              return <CommentReply data={recomment} key={recomment.commentId} />;
            })}
            <ReplyComment
              diaryId={diaryId}
              parentNickname={commentsFam.parentComment.nickname}
              parentCommentId={commentsFam.parentComment.commentId}
            />
          </React.Fragment>
        );
      })}
      <div className="h-[2vh]" />
      <NewComment diaryId={diaryId} />
    </div>
  );
};

const Divider = tw.hr`
h-[2px] bg-[#C7C7C7] mx-auto
`;

const NumCommentsWrapper = tw.div`
mt-2 md:mt-3 mb-1 md:mb-2 mx-auto text-[1.8vh]
`;
