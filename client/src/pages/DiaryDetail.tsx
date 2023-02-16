import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Fade from "react-reveal/Fade";

import { isDeleteModalVisibleAtom, selectedStickersAtom } from "../recoil/diary-detail/atom";
import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import { Diary } from "../components/book/DiaryListContainer";
import StickerSaveBtn from "src/components/diary-detail/StickerSaveBtn";
import { StickerSection } from "src/components/diary-detail/StickerSection";
import StickerButton from "src/components/diary-detail/StickerButton";
import { CommentSection } from "src/components/diary-detail/CommentSection";
import DeleteModal from "src/components/diary-detail//DeleteModal";
import { DiarySection } from "src/components/diary-detail/DiarySection";
import { DiarySectionContainer } from "src/components/diary-detail/DiarySectionContainer";
import MoveableSticker from "src/components/diary-detail/MoveableSticker";

export interface DiaryContainerProps {
  data: Diary;
}

export interface DiaryId {
  diaryId: number;
}

const DiaryDetail = () => {
  const location = useLocation();
  const data = location.state.diaryInfo;
  const params = useParams();
  const diaryId = Number(params.diaryId);
  const [isEditingSticker, setIsEditingSticker] = useState<boolean>(true);
  const selectedStickers = useRecoilValue(selectedStickersAtom);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useRecoilState(
    isDeleteModalVisibleAtom
  );
  const resetIsDeleteModalVisible = useResetRecoilState(isDeleteModalVisibleAtom);
  const changeStickerEditState = () => {
    setIsEditingSticker((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      resetIsDeleteModalVisible();
      setIsEditingSticker(false);
    };
  }, []);

  return (
    <PinkPurpleBackground className="overflow-auto">
      <BackButton />
      {isEditingSticker && <StickerSaveBtn />}
      <Fade duration={1000}>
        <DiarySectionContainer className="relative overflow-hidden">
          {isEditingSticker && (
            <>
              {selectedStickers.map((sticker) => {
                const uniqueId = uuidv4();
                return (
                  <MoveableSticker
                    key={uniqueId}
                    id={uniqueId}
                    stickerImg={sticker.stickerImg}
                  />
                );
              })}
            </>
          )}
          <DiarySection data={data} />
          <StickerButton changeEditState={changeStickerEditState} />
          <CommentSection diaryId={diaryId} />
          {isDeleteModalVisible && (
            <DeleteModal
              onClose={() => {
                setIsDeleteModalVisible(false);
              }}
            />
          )}
        </DiarySectionContainer>
      </Fade>
      {isEditingSticker && (
        <>
          <StickerSection changeEditState={changeStickerEditState} />
          <div className="h-[23vh]" />
        </>
      )}
    </PinkPurpleBackground>
  );
};

export default DiaryDetail;
