import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import Fade from "react-reveal/Fade";

import { AffixedStickerInfo } from "src/@types/response";
import { focusedDiaryIdAtom, isDeleteModalVisibleAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import BackButton from "src/components/common/BackButton";
import { MoveableSticker, DiarySection } from "src/components/common/diary";
import {
  StickerSaveBtn,
  StickerSection,
  StickerButton,
  CommentSection,
  CommentsSkeleton,
  DeleteModal,
} from "src/components/diary-detail";
import * as G from "src/styles/Common";
import useNewSticker from "src/hooks/useNewSticker";

const DiaryDetail = () => {
  const params = useParams();
  const location = useLocation();
  const data = location.state.diaryInfo;
  const setDiaryId = useSetRecoilState(focusedDiaryIdAtom);
  const resetDiaryId = useResetRecoilState(focusedDiaryIdAtom);

  const [numComments, setNumComments] = useState<number>(data.numComments);
  const updateNumComments = (newNumComments: number) => {
    setNumComments(newNumComments);
  };
  const {
    selectedStickers,
    handleAddNewSticker,
    handleUpdateStickers,
    handleDeleteStickers,
    handleResetSelectedStcks,
  } = useNewSticker();
  const [isStickerEditing, setIsStickerEditing] = useState<boolean>(false);
  const changeStickerEditState = () => {
    setIsStickerEditing((prev) => !prev);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useRecoilState(
    isDeleteModalVisibleAtom
  );
  const resetIsDeleteModalVisible = useResetRecoilState(isDeleteModalVisibleAtom);

  const [stickers, setStickers] = useState<AffixedStickerInfo[]>([]);
  const getAffixedStickers = async () => {
    try {
      const { data } = await api.get(API_URL.stickers(Number(params.diaryId)));
      setStickers(data.data);
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

  useEffect(() => {
    return () => {
      resetDiaryId();
    };
  }, []);

  useEffect(() => {
    return () => {
      resetIsDeleteModalVisible();
      setIsStickerEditing(false);
    };
  }, []);

  return (
    <G.PinkPurpleBackground className="overflow-auto">
      <BackButton />
      {isStickerEditing && (
        <StickerSaveBtn
          selectedStickers={selectedStickers}
          handleUpdateStickers={handleUpdateAffixedStickers}
          handleResetSelectedStcks={handleResetSelectedStcks}
          changeStickerEditState={changeStickerEditState}
        />
      )}
      <Fade bottom>
        <G.UnclickableContainer className="my-[8vh]">
          {stickers.map((sticker) => {
            return (
              <MoveableSticker
                key={sticker.stickedStickerId}
                sticker={sticker}
                handleUpdateStickers={handleUpdateAffixedStickers}
              />
            );
          })}
          {isStickerEditing && (
            <>
              {selectedStickers.map((sticker) => {
                return (
                  <MoveableSticker
                    key={sticker.stickedStickerId}
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
          <Suspense fallback={<CommentsSkeleton numComments={numComments} />}>
            <CommentSection updateNumComments={updateNumComments} />
          </Suspense>
          {isDeleteModalVisible && (
            <DeleteModal
              onClose={() => {
                setIsDeleteModalVisible(false);
              }}
            />
          )}
        </G.UnclickableContainer>
      </Fade>
      {isStickerEditing && (
        <>
          <StickerSection
            changeEditState={changeStickerEditState}
            handleAddNewSticker={handleAddNewSticker}
          />
          <div className="h-[23vh]" />
        </>
      )}
    </G.PinkPurpleBackground>
  );
};

export default DiaryDetail;
