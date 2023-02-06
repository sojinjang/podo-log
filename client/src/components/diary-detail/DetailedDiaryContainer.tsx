import React from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import changeToKoreanTime from "src/utils/time";
import { Diary } from "../book/DiaryListContainer";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import StickerButton from "./StickerButton";
import { CommentSection } from "./CommentSection";
import { ProfileImg } from "../common/ProfileImg";

interface DiaryContainerProps {
  data: Diary;
}
export interface DiaryId {
  diaryId: number;
}

export const DetailedDiaryContainer = ({ data }: DiaryContainerProps) => {
  const params = useParams();
  const diaryId = Number(params.diaryId);
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const isRevised = data.createdAt !== data.updatedAt;

  return (
    <Fade duration={1000}>
      <Container>
        <div className="flex">
          <ProfileImg src={profileImgSrc}></ProfileImg>
          <div className="my-auto">
            <Nickname>{data.nickname}</Nickname>
            <div className="flex">
              <Date>{changeToKoreanTime(data.updatedAt)}</Date>
              {isRevised && <Date className="ml-1">(수정됨)</Date>}
            </div>
          </div>
        </div>
        {data.picture && <Photo src={data.picture} />}
        <DiaryTitle>{data.title}</DiaryTitle>
        <DiaryContent>{data.content}</DiaryContent>
        <StickerButton diaryId={diaryId} />
        <CommentSection diaryId={diaryId} />
      </Container>
    </Fade>
  );
};

const Container = tw.div`
bg-white/60 rounded-lg shadow-lg
mx-auto my-[8vh] w-[90%]
`;

const Nickname = tw.p`
text-[1.8vh] md:text-[1.6vh]
`;

const Date = tw.p`
text-gray-1000 text-[1.5vh] md:text-[1.4vh]
`;

const Photo = tw.img`
w-[70%] mx-6 md:mx-8
`;

const DiaryTitle = tw.p`
mx-6 md:mx-8 mt-2 text-[2.2vh] md:text-[2vh]
whitespace-pre-line break-all
`;

const DiaryContent = tw.p`
mx-6 md:mx-8 pb-4 md:pb-6 text-[1.8vh] md:text-[1.6vh] 
whitespace-pre-line break-all
`;
