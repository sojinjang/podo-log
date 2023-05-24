import Moveable from "react-moveable";

import cancelImg from "src/assets/icons/x.png";
import { AffixedStickerInfo } from "src/@types/response";
import { EditingStickerInfo } from "src/@types/diary";
import useMovableSticker from "src/hooks/useMovableSticker";
import * as S from "src/styles/Diary";

interface MoveableStickerProps<T extends EditingStickerInfo | AffixedStickerInfo> {
  sticker: T;
  handleUpdateStickers: (newSticker: T) => void;
  handleDeleteStickers?: T extends EditingStickerInfo ? (newSticker: T) => void : undefined;
}

const MoveableSticker = <T extends EditingStickerInfo | AffixedStickerInfo>({
  sticker,
  handleUpdateStickers,
  handleDeleteStickers,
}: MoveableStickerProps<T>) => {
  const isEditingStck = Boolean(handleDeleteStickers);
  const { targetElem, handleDragStart, handleOnDrag, handleDragEnd } = useMovableSticker(
    isEditingStck,
    sticker,
    handleUpdateStickers
  );

  return (
    <>
      <Moveable
        target={targetElem}
        draggable={true}
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleDragEnd}
      />
      <S.MoveableStickerContainer className={`target-${sticker.stickedStickerId}`}>
        <S.StickerImg alt="sticker" src={sticker.stickerImg} />
        {isEditingStck && (
          <S.CancelImg
            onClick={() => {
              if (handleDeleteStickers) handleDeleteStickers(sticker as EditingStickerInfo);
            }}
            src={cancelImg}
            alt="cancel"
          />
        )}
      </S.MoveableStickerContainer>
    </>
  );
};

export default MoveableSticker;
