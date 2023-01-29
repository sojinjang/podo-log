import React from "react";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import changeToKoreanTime from "src/utils/time";
import { Diary } from "./DiaryListContainer";
import commentImg from "../../assets/icons/comment.png";

interface DiaryContainerProps {
  viewRef?: () => void;
  data: Diary;
}

// TODO: 사진 기능, comment 기능 완성되는 대로 data에서 꺼내서 보여주는걸로 코드 변경하기
const DiaryContainer = ({ viewRef, data }: DiaryContainerProps) => {
  return (
    <Fade bottom duration={1000}>
      <Container ref={viewRef}>
        <div className="flex">
          <ProfileImg src={require("../../assets/profile.jpg")}></ProfileImg>
          <div className="my-auto">
            <Nickname>{data.nickname}</Nickname>
            <Date>{changeToKoreanTime(data.updatedAt)}</Date>
          </div>
        </div>
        <Photo src={require("../../assets/IMG_7291.JPG")} />
        <DiaryTitle>{data.title}</DiaryTitle>
        <DiaryContent>{data.content}</DiaryContent>
        <CommentContainer>
          <CommentIcon src={commentImg} />
          <NumComments>3</NumComments>
        </CommentContainer>
      </Container>
    </Fade>
  );
};

export default DiaryContainer;

const Container = tw.div`
cursor-pointer bg-white/60 rounded-lg 
shadow-lg hover:shadow-none ease-in duration-200
mx-auto mb-[2vh] w-[90%]
`;

const ProfileImg = tw.img`
w-[45px] h-[45px] min-[390px]:w-[60px] min-[390px]:h-[60px] md:w-[65px] md:w-[65px] 
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

const CommentContainer = tw.div`
flex justify-end mr-6 md:mr-8 pb-4 md:pb-6
`;

const CommentIcon = tw.img`
w-[25px] h-[25px] min-[390px]:w-[34px] min-[390px]:h-[34px] md:w-[37px] md:w-[37px]
`;

const NumComments = tw.p`
text-[2.2vh] md:text-[2vh] ml-1 my-auto
`;
