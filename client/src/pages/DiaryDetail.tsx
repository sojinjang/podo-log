import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Fade from "react-reveal/Fade";

import { isDeleteModalVisibleAtom } from "../recoil/diary-detail/atom";
import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import { Diary } from "../components/book/DiaryListContainer";
import StickerSaveBtn from "src/components/diary-detail/StickerSaveBtn";
import { StickerInfo, StickerSection } from "src/components/diary-detail/StickerSection";
import StickerButton from "src/components/diary-detail/StickerButton";
import { CommentSection } from "src/components/diary-detail/CommentSection";
import DeleteModal from "src/components/diary-detail//DeleteModal";
import { DiarySection } from "src/components/diary-detail/DiarySection";
import { DiarySectionContainer } from "src/components/diary-detail/DiarySectionContainer";
import EditingSticker from "src/components/diary-detail/EditingSticker";

export interface DiaryContainerProps {
  data: Diary;
}

export interface DiaryId {
  diaryId: number;
}

export interface EditingStickerInfo extends StickerInfo {
  uniqueId: string;
  locX: number;
  locY: number;
}

const DiaryDetail = () => {
  const DEFAULT_STKR_POS_X = 18;
  const DEFAULT_STKR_POS_Y = (18 * 16) / 9;
  const location = useLocation();
  const data = location.state.diaryInfo;
  const params = useParams();
  const diaryId = Number(params.diaryId);

  const [isEditingSticker, setIsEditingSticker] = useState<boolean>(true);
  const changeStickerEditState = () => {
    setIsEditingSticker((prev) => !prev);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useRecoilState(
    isDeleteModalVisibleAtom
  );
  const resetIsDeleteModalVisible = useResetRecoilState(isDeleteModalVisibleAtom);

  const [selectedStickers, setSelectedStickers] = useState<EditingStickerInfo[]>([]);
  const handleAddNewSticker = (newSticker: StickerInfo) => {
    setSelectedStickers((curStickers) => {
      return [
        ...curStickers,
        {
          stickerId: newSticker.stickerId,
          uniqueId: uuidv4(),
          stickerImg: newSticker.stickerImg,
          locX: DEFAULT_STKR_POS_X,
          locY: DEFAULT_STKR_POS_Y,
        },
      ];
    });
  };
  const handleUpdateStickers = (newSticker: EditingStickerInfo) => {
    setSelectedStickers((curStickers) => {
      return [
        ...curStickers.filter((sticker) => sticker.uniqueId !== newSticker.uniqueId),
        newSticker,
      ];
    });
  };
  const handleDeleteStickers = (stickerBeDeleted: EditingStickerInfo) => {
    setSelectedStickers((curStickers) => {
      return curStickers.filter((sticker) => sticker.uniqueId !== stickerBeDeleted.uniqueId);
    });
  };
  const handleResetSelectedStcks = () => {
    setSelectedStickers([]);
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
      {isEditingSticker && (
        <StickerSaveBtn
          diaryId={diaryId}
          selectedStickers={selectedStickers}
          changeStickerEditState={changeStickerEditState}
          handleResetSelectedStcks={handleResetSelectedStcks}
        />
      )}
      <Fade duration={1000}>
        <DiarySectionContainer className="relative overflow-hidden">
          {isEditingSticker && (
            <>
              {selectedStickers.map((sticker) => {
                return (
                  <EditingSticker
                    key={sticker.uniqueId}
                    sticker={sticker}
                    handleUpdateStickers={handleUpdateStickers}
                    handleDeleteStickers={handleDeleteStickers}
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
          <StickerSection
            changeEditState={changeStickerEditState}
            handleAddNewSticker={handleAddNewSticker}
          />
          <div className="h-[23vh]" />
        </>
      )}
    </PinkPurpleBackground>
  );
};

export default DiaryDetail;
