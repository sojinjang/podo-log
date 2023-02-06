import React, { useEffect, useState } from "react";
import { API_URL } from "src/constants/API_URL";
import { get } from "src/utils/api";
import tw from "tailwind-styled-components";
import { Input, InputContainer } from "../common/Input";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "src/recoil/token";
import { DiaryId } from "./DetailedDiaryContainer";
import NewComment from "./NewComment";

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

  return (
    <div className="w-[90%] mx-auto pb-6 md:pb-8">
      <Divider />
      <div className="text-[1.8vh]">댓글 3</div>
      <NewComment diaryId={diaryId} />
    </div>
  );
};

export default CommentSection;

const Divider = tw.hr`
w-full h-[2px] bg-[#C7C7C7]
mb-4 md:mb-6
`;

const PostButton = tw.div` 
w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;
