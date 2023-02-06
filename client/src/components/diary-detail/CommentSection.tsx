import React, { useState } from "react";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "src/recoil/token";
import { DiaryId } from "./DetailedDiaryContainer";
import NewComment from "./NewComment";
import { useDidMountEffect } from "src/utils/hooks";
import { Comment, CommentReply } from "./Comment";

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

  console.log(commentsArr);

  const mock = [
    {
      parents: {
        commentId: 1,
        userId: 1,
        nickname: "test1",
        profile: "없음",
        parentCommentId: 0,
        reply: "11111 댓글 내용 채우는중 테스트 11111",
        createdAt: "2023-02-06T06:22:46.000Z",
        updatedAt: "2023-02-06T06:22:46.000Z",
      },
      reply: [
        {
          commentId: 1,
          userId: 1,
          nickname: "test1",
          profile: "없음",
          parentCommentId: 0,
          reply: "11111 댓글 내용 채우는중 테스트 11111",
          createdAt: "2023-02-06T06:22:46.000Z",
          updatedAt: "2023-02-06T06:22:46.000Z",
        },
        {
          commentId: 1,
          userId: 1,
          nickname: "test1",
          profile: "없음",
          parentCommentId: 0,
          reply: "11111 댓글 내용 채우는중 테스트 11111",
          createdAt: "2023-02-06T06:22:46.000Z",
          updatedAt: "2023-02-06T06:22:46.000Z",
        },
      ],
    },
  ];

  useDidMountEffect(getComments, []);

  return (
    <div className="pb-6 md:pb-8">
      <Divider />
      <CommentsContainer>댓글 {commentsArr.length}</CommentsContainer>
      {/* {commentsArr.map((comment) => {
        return (
          <>
            <Comment data={comment} key={comment.commentId} />
                {comment.map((c) => {
                    return (
                    <CommentReply data={c} key={comment.commentId+100} />
                )}
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
