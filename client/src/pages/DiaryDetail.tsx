import { useState, useEffect, Suspense } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import Fade from "react-reveal/Fade";

import { StickerInfo } from "src/@types/response";
import { focusedDiaryIdAtom, isDeleteModalVisibleAtom } from "src/recoil/diary-detail/atom";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import BackButton from "../components/common/BackButton";
import { AffixedSticker, AffixedStickerInfo } from "src/components/common/diary/Sticker";
import { DiarySection } from "src/components/common/diary/DiarySection";
import StickerSaveBtn from "src/components/diary-detail/StickerSaveBtn";
import { StickerSection } from "src/components/diary-detail/StickerSection";
import StickerButton from "src/components/diary-detail/StickerButton";
import { CommentSection } from "src/components/diary-detail/CommentSection";
import DeleteModal from "src/components/diary-detail//DeleteModal";
import EditingSticker from "src/components/diary-detail/EditingSticker";
import CommentsSkeleton from "src/components/diary-detail/CommentsSkeleton";
import * as G from "src/styles/Common";

export interface EditingStickerInfo extends StickerInfo {
  uniqueId: string;
  locX: number;
  locY: number;
}
// TODO: diary 공통 type 분리

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
          uniqueId: uuidv4(),
          // TODO: stickedStickerId로 변경
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
    <G.PinkPurpleBackground className="overflow-auto">
      <BackButton />
      {isEditingSticker && (
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
      {isEditingSticker && (
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
