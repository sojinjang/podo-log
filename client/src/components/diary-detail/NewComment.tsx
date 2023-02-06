import React, { useState } from "react";
import { API_URL } from "src/constants/API_URL";
import { post } from "src/utils/api";
import tw from "tailwind-styled-components";
import { Input, InputContainer } from "../common/Input";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "src/recoil/token";
import { DiaryId } from "./DetailedDiaryContainer";

const NewComment = ({ diaryId }: DiaryId) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [newComment, setNewComment] = useState<string>("");

  return (
    <InputContainer className="flex-row w-full mt-6 md:mt-8 shadow-lg">
      <Input
        className="font-[Do Hyeon] w-[90%]"
        placeholder="댓글을 입력해주세요. (90자 이하)"
      />
      <PostButton>등록</PostButton>
    </InputContainer>
  );
};

export default NewComment;

const PostButton = tw.div` 
w-[10%] ml-auto cursor-pointer text-center
text-sm sm:text-lg text-purple-1000 hover:opacity-50 ease-in duration-300
`;
