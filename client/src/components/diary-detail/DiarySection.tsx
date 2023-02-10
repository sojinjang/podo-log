import React from "react";
import tw from "tailwind-styled-components";

import changeToKoreanTime from "src/utils/time";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import { ProfileImg, Nickname, Date } from "../common/WriterInfo";
import { DiaryContainerProps } from "./DetailedDiaryContainer";

export const DiarySection = ({ data }: DiaryContainerProps) => {
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const hasPicture = data.picture !== "없음";
  const isRevised = data.createdAt !== data.updatedAt;

  return (
    <>
      <div className="flex">
        <ProfileImg className="mr-2 md:mr-3" src={profileImgSrc}></ProfileImg>
        <div className="my-auto">
          <Nickname>{data.nickname}</Nickname>
          <div className="flex">
            <Date>{changeToKoreanTime(data.updatedAt)}</Date>
            {isRevised && <Date className="ml-1">(수정됨)</Date>}
          </div>
        </div>
      </div>
      {hasPicture && <Photo src={String(data.picture)} />}
      <DiaryTitle>{data.title}</DiaryTitle>
      <DiaryContent>{data.content}</DiaryContent>
    </>
  );
};

const Photo = tw.img`
max-w-[90%] mt-3
`;

const DiaryTitle = tw.p`
mt-2 text-[2.2vh] md:text-[2vh]
whitespace-pre-line break-all
`;

const DiaryContent = tw.p`
pb-4 md:pb-6 text-[1.8vh] md:text-[1.6vh] 
whitespace-pre-line break-all
`;
