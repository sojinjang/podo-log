import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Moveable, { OnDragStart, OnDrag, OnDragEnd } from "react-moveable";

import { useDidMountEffect } from "src/utils/hooks";
import { convertToRelativeCoord, convertToAbsCoord } from "src/utils/convertCoord";
import { EditingStickerInfo } from "src/pages/DiaryDetail";
import { MoveableStickerContainer, StickerImg } from "../common/AffixedSticker";

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

  useDidMountEffect(() => {
    const targetElem = document.querySelector(`.target-${sticker.uniqueId}`) as HTMLElement;
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
      <MoveableStickerContainer className={`target-${sticker.uniqueId}`}>
        <StickerImg src={sticker.stickerImg} />
        <CancelImg
          onClick={() => {
            handleDeleteStickers(sticker);
          }}
          src={require("../../assets/icons/x.png")}
        />
      </MoveableStickerContainer>
    </>
  );
};

export default EditingSticker;

const CancelImg = tw.img`
h-[2vh] absolute right-0 
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;
