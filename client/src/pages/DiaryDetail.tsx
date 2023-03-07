import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Fade from "react-reveal/Fade";

import { focusedDiaryIdAtom, isDeleteModalVisibleAtom } from "../recoil/diary-detail/atom";
import { accessTokenAtom } from "src/recoil/token";
import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import { AffixedSticker, AffixedStickerInfo } from "src/components/common/diary/Sticker";
import { DiarySection } from "src/components/common/diary/DiarySection";
import { UnclickableContainer } from "src/components/common/UnclickableContainer";
import StickerSaveBtn from "src/components/diary-detail/StickerSaveBtn";
import { StickerInfo, StickerSection } from "src/components/diary-detail/StickerSection";
import StickerButton from "src/components/diary-detail/StickerButton";
import { CommentSection } from "src/components/diary-detail/CommentSection";
import DeleteModal from "src/components/diary-detail//DeleteModal";
import EditingSticker from "src/components/diary-detail/EditingSticker";
import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";

export interface EditingStickerInfo extends StickerInfo {
  uniqueId: string;
  locX: number;
  locY: number;
}

const DiaryDetail = () => {
  const DEFAULT_STKR_POS_X = 10;
  const DEFAULT_STKR_POS_Y = 10;
  const params = useParams();
  const location = useLocation();
  const data = location.state.diaryInfo;
  const [diaryId, setDiaryId] = useRecoilState(focusedDiaryIdAtom);
  const accessToken = useRecoilValue(accessTokenAtom);

  const [isEditingSticker, setIsEditingSticker] = useState<boolean>(false);
  const changeStickerEditState = () => {
    setIsEditingSticker((prev) => !prev);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useRecoilState(
    isDeleteModalVisibleAtom
  );
  const resetIsDeleteModalVisible = useResetRecoilState(isDeleteModalVisibleAtom);

  const [stickers, setStickers] = useState<AffixedStickerInfo[]>([]);
  const getAffixedStickers = async () => {
    try {
      const response = await get(API_URL.stickers(diaryId), "", accessToken);
      setStickers(response.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  const handleUpdateAffixedStickers = (newSticker: AffixedStickerInfo) => {
    setStickers((curStickers) => {
      return [
        ...curStickers.filter(
          (sticker) => sticker.stickedStickerId !== newSticker.stickedStickerId
        ),
        newSticker,
      ];
    });
  };
  useEffect(() => {
    setDiaryId(Number(params.diaryId));
    getAffixedStickers();
  }, []);

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
          selectedStickers={selectedStickers}
          handleUpdateStickers={handleUpdateAffixedStickers}
          handleResetSelectedStcks={handleResetSelectedStcks}
          changeStickerEditState={changeStickerEditState}
        />
      )}
      <Fade duration={1000}>
        <UnclickableContainer className="my-[8vh]">
          {stickers.map((sticker) => {
            return (
              <AffixedSticker
                key={sticker.stickedStickerId}
                sticker={sticker}
                handleUpdateStickers={handleUpdateAffixedStickers}
              />
            );
          })}
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
          <DiarySection data={data} isDetailPage={true} />
          <StickerButton changeEditState={changeStickerEditState} />
          <CommentSection />
          {isDeleteModalVisible && (
            <DeleteModal
              onClose={() => {
                setIsDeleteModalVisible(false);
              }}
            />
          )}
        </UnclickableContainer>
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
