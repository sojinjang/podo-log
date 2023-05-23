import { useState } from "react";
import { useRecoilValue } from "recoil";

import { Diary } from "src/@types/response";
import { accessTokenAtom } from "src/recoil/token";
import { getUserId } from "src/utils/getUserId";
import changeToKoreanTime from "src/utils/time";
import DefaultProfileImg from "src/assets/icons/default_profile.png";
import DropdownMenu from "src/components/diary-detail/DropdownMenu";
import * as G from "src/styles/Diary";
import * as S from "src/styles/Diary";

export interface DiaryContainerProps {
  data: Diary;
  isDetailPage: boolean;
}

const DiarySection = ({ data, isDetailPage = true }: DiaryContainerProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const isDiaryWriter = getUserId(accessToken) === data.userId;
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const hasPicture = data.picture !== "없음";
  const isRevised = data.createdAt !== data.updatedAt;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className="flex">
        <G.ProfileImg className="mr-2 md:mr-3" src={profileImgSrc}></G.ProfileImg>
        <div className="my-auto">
          <G.Nickname>{data.nickname}</G.Nickname>
          <div className="flex">
            <G.Date>{changeToKoreanTime(data.updatedAt)}</G.Date>
            {isRevised && <G.Date className="ml-1">(수정됨)</G.Date>}
          </div>
        </div>
        {isDetailPage && isDiaryWriter && (
          <DropdownMenu deleteInfo={{ id: data.diaryId, target: "diary" }} />
        )}
      </div>
      {hasPicture && (
        <>
          {isLoading && (
            <div className="w-[39vh]">
              <S.PhotoSkeleton />
            </div>
          )}
          <S.Photo
            alt="picture"
            src={String(data.picture)}
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? "none" : "block" }}
          />
        </>
      )}
      <S.DiaryTitle>{data.title}</S.DiaryTitle>
      <S.DiaryContent>{data.content}</S.DiaryContent>
    </>
  );
};

export default DiarySection;
