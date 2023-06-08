import { Suspense, useState } from "react";
import { useRecoilState } from "recoil";

import { AffixedStickerInfo, Diary } from "src/@types/response";
import { EditingStickerInfo } from "src/@types/diary";
import { isDeleteModalVisibleAtom } from "src/recoil/diary-detail/atom";
import { DiarySection, MoveableSticker } from "src/components/common/diary";
import StickerButton from "./StickerButton";
import CommentSection from "./CommentSection";
import DeleteModal from "./DeleteModal";
import CommentsSkeleton from "./CommentsSkeleton";
import * as G from "src/styles/Common";

interface DiaryContainerProps {
  isStickerEditing: boolean;
  stickers: AffixedStickerInfo[];
  handleUpdateAffixedStickers: (newSticker: AffixedStickerInfo) => void;
  handleUpdateStickers: (newSticker: EditingStickerInfo) => void;
  handleDeleteStickers: (newSticker: EditingStickerInfo) => void;
  changeStickerEditState: () => void;
  selectedStickers: EditingStickerInfo[];
  data: Diary;
}

const DiaryContainer = ({
  isStickerEditing,
  stickers,
  handleUpdateAffixedStickers,
  handleUpdateStickers,
  handleDeleteStickers,
  changeStickerEditState,
  selectedStickers,
  data,
}: DiaryContainerProps) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useRecoilState(
    isDeleteModalVisibleAtom
  );
  const [numComments, setNumComments] = useState<number>(data.numComments);
  const updateNumComments = (newNumComments: number) => {
    setNumComments(newNumComments);
  };

  return (
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
  );
};

export default DiaryContainer;
