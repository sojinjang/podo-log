import React, { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { isDeleteModalVisibleAtom } from "../../recoil/diary-detail/atom";
import changeToKoreanTime from "src/utils/time";
import { Diary } from "../book/DiaryListContainer";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import StickerButton from "./StickerButton";
import { CommentSection } from "./CommentSection";
import { ProfileImg, Nickname, Date } from "../common/WriterInfo";
import DeleteModal from "./DeleteModal";

interface DiaryContainerProps {
  data: Diary;
}
export interface DiaryId {
  diaryId: number;
}

export const DetailedDiaryContainer = ({ data }: DiaryContainerProps) => {
  const params = useParams();
  const diaryId = Number(params.diaryId);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useRecoilState(
    isDeleteModalVisibleAtom
  );
  const resetIsDeleteModalVisible = useResetRecoilState(isDeleteModalVisibleAtom);
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const isRevised = data.createdAt !== data.updatedAt;
  useEffect(() => {
    return () => {
      resetIsDeleteModalVisible();
    };
  }, []);

  return (
    <Fade duration={1000}>
      <Container>
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
        {data.picture && <Photo src={data.picture} />}
        <DiaryTitle>{data.title}</DiaryTitle>
        <DiaryContent>{data.content}</DiaryContent>
        <StickerButton diaryId={diaryId} />
        <CommentSection diaryId={diaryId} />
        {isDeleteModalVisible && (
          <DeleteModal
            onClose={() => {
              setIsDeleteModalVisible(false);
            }}
          />
        )}
      </Container>
    </Fade>
  );
};

const Container = tw.div`
bg-white/60 rounded-lg shadow-lg
mx-auto my-[8vh] w-[90%] p-[3vh]
`;

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
