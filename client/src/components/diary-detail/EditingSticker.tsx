import { useState, useEffect } from "react";
import Moveable, { OnDragStart, OnDrag, OnDragEnd } from "react-moveable";

import { EditingStickerInfo } from "src/@types/diary";
import { convertToRelativeCoord, convertToAbsCoord } from "src/utils/convertCoord";
import cancelImg from "../../assets/icons/x.png";
import * as G from "src/styles/Diary";
import * as S from "src/styles/DiaryDetail";

interface DraggableStickerProps {
  sticker: EditingStickerInfo;
  handleUpdateStickers: (newSticker: EditingStickerInfo) => void;
  handleDeleteStickers: (newSticker: EditingStickerInfo) => void;
}

const EditingSticker = ({
  sticker,
  handleUpdateStickers,
  handleDeleteStickers,
}: DraggableStickerProps) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  useEffect(() => {
    const targetElem = document.querySelector(
      `.target-${sticker.stickedStickerId}`
    ) as HTMLElement;
    targetElem.style.transform = `translate(${sticker.locX}vh, ${sticker.locY}vh`;
    setTargetElem(targetElem);
  }, []);

  const handleDragStart = (e: OnDragStart) => {
    e.set([convertToAbsCoord(sticker.locX), convertToAbsCoord(sticker.locY)]);
  };
  const handleOnDrag = (e: OnDrag) => {
    const positionX = convertToRelativeCoord(e.beforeTranslate[0]);
    const positionY = convertToRelativeCoord(e.beforeTranslate[1]);
    e.target.style.transform = `translate(${positionX}vh, ${positionY}vh)`;
  };
  const handleDragEnd = (e: OnDragEnd) => {
    if (e.lastEvent) {
      const positionX = convertToRelativeCoord(e.lastEvent.beforeTranslate[0]);
      const positionY = convertToRelativeCoord(e.lastEvent.beforeTranslate[1]);
      handleUpdateStickers({
        ...sticker,
        locX: positionX,
        locY: positionY,
      });
    }
  };

  return (
    <>
      <Moveable
        target={targetElem}
        draggable={true}
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleDragEnd}
      />
      <G.MoveableStickerContainer className={`target-${sticker.stickedStickerId}`}>
        <G.StickerImg src={sticker.stickerImg} />
        <S.CancelImg
          onClick={() => {
            handleDeleteStickers(sticker);
          }}
          src={cancelImg}
          alt="cancel"
        />
      </G.MoveableStickerContainer>
    </>
  );
};

export default EditingSticker;
