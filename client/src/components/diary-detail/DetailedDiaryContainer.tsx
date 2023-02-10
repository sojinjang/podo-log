import React, { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { isDeleteModalVisibleAtom } from "../../recoil/diary-detail/atom";
import { Diary } from "../book/DiaryListContainer";
import StickerButton from "./StickerButton";
import { CommentSection } from "./CommentSection";
import DeleteModal from "./DeleteModal";
import { DiarySection } from "./DiarySection";

export interface DiaryContainerProps {
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

  useEffect(() => {
    return () => {
      resetIsDeleteModalVisible();
    };
  }, []);

  return (
    <Fade duration={1000}>
      <Container>
        <DiarySection data={data} />
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
