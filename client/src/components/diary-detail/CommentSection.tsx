import React, { useState } from "react";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "src/recoil/token";
import { DiaryId } from "./DetailedDiaryContainer";
import NewComment from "./NewComment";
import { useDidMountEffect } from "src/utils/hooks";
import Comment from "./Comment";

export interface CommentType {
  commentId: number;
  userID: number;
  nickname: string;
  profile: string;
  parentCommentId: number;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CommentSection = ({ diaryId }: DiaryId) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [commentsArr, setCommentsArr] = useState<CommentType[]>([]);

  const getComments = async () => {
    try {
      const response = await get(API_URL.diaryComments(diaryId), "", accessToken);
      setCommentsArr(response.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useDidMountEffect(getComments, []);

  return (
    <div className="pb-6 md:pb-8">
      <Divider />
      <CommentsContainer>댓글 {commentsArr.length}</CommentsContainer>
      {commentsArr.map((comment) => {
        return <Comment data={comment} key={comment.commentId} />;
      })}
      <NewComment diaryId={diaryId} />
    </div>
  );
};

const Divider = tw.hr`
h-[2px] bg-[#C7C7C7] mx-auto
`;

const CommentsContainer = tw.div`
mt-2 md:mt-3 mb-1 md:mb-2 mx-auto text-[1.8vh]
`;
