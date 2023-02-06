import React, { useState } from "react";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "src/recoil/token";
import { DiaryId } from "./DetailedDiaryContainer";
import NewComment from "./NewComment";
import { useDidMountEffect } from "src/utils/hooks";

interface Comment {
  commentId: number;
  userID: number;
  nickname: string;
  profile: string;
  parentCommentId: number;
  reply: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSection = ({ diaryId }: DiaryId) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [commentsArr, setCommentsArr] = useState<Comment[]>([]);
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
    <div className="w-[90%] mx-auto pb-6 md:pb-8">
      <Divider />
      <div className="text-[1.8vh]">댓글 {commentsArr.length}</div>
      <NewComment diaryId={diaryId} />
    </div>
  );
};

export default CommentSection;

const Divider = tw.hr`
w-full h-[2px] bg-[#C7C7C7]
mb-4 md:mb-6
`;
