import React from "react";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import changeToKoreanTime from "src/utils/time";
import { Diary } from "../book/DiaryListContainer";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import StickerButton from "./StickerButton";
import CommentSection from "./CommentSection";

interface DiaryContainerProps {
  data: Diary;
}

const DetailedDiaryContainer = ({ data }: DiaryContainerProps) => {
  console.log(data);
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
        <StickerButton />
        <CommentSection />
      </Container>
    </Fade>
  );
};

export default DetailedDiaryContainer;

const Container = tw.div`
bg-white/60 rounded-lg shadow-lg
mx-auto my-[8vh] w-[90%]
`;

const ProfileImg = tw.img`
w-[45px] h-[45px] min-[390px]:w-[60px] min-[390px]:h-[60px] md:w-[65px] md:h-[65px] 
rounded-full object-cover shadow-lg ml-4 my-4 mr-2 md:ml-6 md:my-6 md:mr-4
`;

const Nickname = tw.p`
text-[1.8vh] md:text-[1.5vh]
`;

const Date = tw.p`
text-gray-1000 text-[1.5vh] md:text-[1.3vh]
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
