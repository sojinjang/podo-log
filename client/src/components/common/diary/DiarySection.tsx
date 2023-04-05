import React from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import { accessTokenAtom } from "src/recoil/token";
import { getUserId } from "src/utils/getUserId";
import changeToKoreanTime from "src/utils/time";
import DefaultProfileImg from "src/assets/icons/default_profile.png";
import { ProfileImg, Nickname, Date } from "./WriterInfo";
import { DropdownMenu } from "../../diary-detail/DropdownMenu";
import { Diary } from "src/components/book/DiaryListContainer";

export interface DiaryContainerProps {
  data: Diary;
  isDetailPage: boolean;
}

export const DiarySection = ({ data, isDetailPage = true }: DiaryContainerProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const isDiaryWriter = getUserId(accessToken) === data.userId;
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
        {isDetailPage && isDiaryWriter && (
          <DropdownMenu deleteInfo={{ id: data.diaryId, target: "diary" }} />
        )}
      </div>
      {hasPicture && <Photo alt="picture" src={String(data.picture)} />}
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
