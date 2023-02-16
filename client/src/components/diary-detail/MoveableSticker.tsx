import React, { useState } from "react";
import Moveable, { OnDragStart, OnDrag, OnDragEnd } from "react-moveable";
import { useSetRecoilState } from "recoil";
import { MoveableStickerInfo, selectedStickersAtom } from "src/recoil/diary-detail/atom";
import { useDidMountEffect } from "src/utils/hooks";
import { convertToRelativeCoord, convertToAbsCoord } from "src/utils/convertCoord";

interface DraggableStickerProps {
  sticker: MoveableStickerInfo;
}

const MoveableSticker = ({ sticker }: DraggableStickerProps) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  const setSelectedStickers = useSetRecoilState(selectedStickersAtom);

  useDidMountEffect(() => {
    const targetElem = document.querySelector(`.target-${sticker.uniqueId}`) as HTMLElement;
    targetElem.style.transform = `translate(${sticker.x}vh, ${sticker.y}vh`;
    setTargetElem(targetElem);
  }, []);

  const handleUpdateStickers = (newSticker: MoveableStickerInfo) => {
    setSelectedStickers((prevStickers) => {
      return [
        ...prevStickers.filter(
          (sticker: MoveableStickerInfo) => sticker.uniqueId !== newSticker.uniqueId
        ),
        newSticker,
      ];
    });
  };

  const handleDragStart = (e: OnDragStart) => {
    e.set([convertToAbsCoord(sticker.x), convertToAbsCoord(sticker.y)]);
  };
  const handleOnDrag = (e: OnDrag) => {
    const positionX = convertToRelativeCoord(e.beforeTranslate[0]);
    const positionY = convertToRelativeCoord(e.beforeTranslate[1]);
    e.target.style.transform = `translate(${positionX}vh, ${positionY}vh)`;
  };
  const handleDragEnd = (e: OnDragEnd) => {
    const positionX = convertToRelativeCoord(e.lastEvent.beforeTranslate[0]);
    const positionY = convertToRelativeCoord(e.lastEvent.beforeTranslate[1]);
    handleUpdateStickers({
      ...sticker,
      x: positionX,
      y: positionY,
    });
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
      <img
        className={`target-${sticker.uniqueId} h-[8vh] z-10 absolute cursor-pointer`}
        src={sticker.stickerImg}
      />
    </>
  );
};

export default MoveableSticker;
