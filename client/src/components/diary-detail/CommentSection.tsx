import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import { DiaryId } from "./DetailedDiaryContainer";
import { useDidMountEffect } from "src/utils/hooks";
import NewComment from "./NewComment";
import { Comment, CommentReply } from "./Comment";

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

export const CommentSection = ({ diaryId }: DiaryId) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [commentsArr, setCommentsArr] = useState<CommentType[]>([]);

  const getComments = async () => {
    try {
      const response = await get(API_URL.diaryComments(diaryId), "", accessToken);
      setCommentsArr(
        response.data.sort(function (a: CommentType, b: CommentType) {
          return a.commentId - b.commentId;
        })
      );
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  // TODO: 백에서 api 변경해주면 mock data 대신 db 데이터로 변경
  const mockDate = new Date("2023-02-06T06:22:46.000Z");
  const mock = [
    {
      comment: {
        commentId: 1,
        userId: 1,
        nickname: "test1",
        profile: "없음",
        parentCommentId: 0,
        reply: "11111 댓글 내용 채우는중 테스트 11111",
        createdAt: mockDate,
        updatedAt: mockDate,
      },
      reply: [
        {
          commentId: 2,
          userId: 1,
          nickname: "test1",
          profile: "없음",
          parentCommentId: 0,
          reply: "대댓글 1",
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        {
          commentId: 3,
          userId: 1,
          nickname: "test1",
          profile: "없음",
          parentCommentId: 0,
          reply: "대댓글 2",
          createdAt: mockDate,
          updatedAt: mockDate,
        },
      ],
    },
  ];

  useDidMountEffect(getComments, []);

  return (
    <div className="pb-6 md:pb-8">
      <Divider />
      <CommentsContainer>댓글 {commentsArr.length}</CommentsContainer>
      {commentsArr.map((comment) => {
        return <Comment data={comment} key={comment.commentId} />;
      })}
      {/* {mock.map((commentFam) => {
        return (
          <>
            <Comment data={commentFam.comment} key={commentFam.comment.commentId} />
            {commentFam.reply.map((reply) => {
              return <CommentReply data={reply} key={reply.commentId} />;
            })}
          </>
        );
      })} */}
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
