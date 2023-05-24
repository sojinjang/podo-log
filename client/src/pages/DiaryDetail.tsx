import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Fade from "react-reveal/Fade";

import { AffixedStickerInfo, StickerInfo } from "src/@types/response";
import { EditingStickerInfo } from "src/@types/diary";
import { focusedDiaryIdAtom, isDeleteModalVisibleAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import BackButton from "src/components/common/BackButton";
import { AffixedSticker, DiarySection } from "src/components/common/diary";
import {
  StickerSaveBtn,
  StickerSection,
  StickerButton,
  CommentSection,
  CommentsSkeleton,
  DeleteModal,
  EditingSticker,
} from "src/components/diary-detail";
import * as G from "src/styles/Common";

const DiaryDetail = () => {
  const DEFAULT_STKR_POS_X = 10;
  const DEFAULT_STKR_POS_Y = 10;
  const params = useParams();
  const location = useLocation();
  const data = location.state.diaryInfo;
  const setDiaryId = useSetRecoilState(focusedDiaryIdAtom);
  const resetDiaryId = useResetRecoilState(focusedDiaryIdAtom);

  const [numComments, setNumComments] = useState<number>(data.numComments);
  const updateNumComments = (newNumComments: number) => {
    setNumComments(newNumComments);
  };
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

  const [selectedStickers, setSelectedStickers] = useState<EditingStickerInfo[]>([]);
  const handleAddNewSticker = (newSticker: StickerInfo) => {
    setSelectedStickers((curStickers) => {
      return [
        ...curStickers,
        {
          stickerId: newSticker.stickerId,
          stickedStickerId: uuidv4(),
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
        ...curStickers.filter(
          (sticker) => sticker.stickedStickerId !== newSticker.stickedStickerId
        ),
        newSticker,
      ];
    });
  };
  const handleDeleteStickers = (stickerBeDeleted: EditingStickerInfo) => {
    setSelectedStickers((curStickers) => {
      return curStickers.filter(
        (sticker) => sticker.stickedStickerId !== stickerBeDeleted.stickedStickerId
      );
    });
  };
  const handleResetSelectedStcks = () => {
    setSelectedStickers([]);
  };

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
              <AffixedSticker
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
                  <EditingSticker
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
