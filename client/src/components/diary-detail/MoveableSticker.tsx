import React, { useState } from "react";
import Moveable, { OnDragEnd } from "react-moveable";
import { useSetRecoilState } from "recoil";
import { MoveableStickerInfo, selectedStickersAtom } from "src/recoil/diary-detail/atom";
import { useDidMountEffect } from "src/utils/hooks";

interface DraggableStickerProps {
  sticker: MoveableStickerInfo;
}

const MoveableSticker = ({ sticker }: DraggableStickerProps) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  const setSelectedStickers = useSetRecoilState(selectedStickersAtom);

  useDidMountEffect(() => {
    const targetElem = document.querySelector(`.target-${sticker.uniqueId}`) as HTMLElement;
    targetElem.style.transform = `translate(${sticker.x}vh, ${sticker.y}vh)`;
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

  const handleDragEnd = (e: OnDragEnd) => {
    if (e.lastEvent) {
      const positionX = e.lastEvent.beforeTranslate[0];
      const positionY = e.lastEvent.beforeTranslate[1];
      handleUpdateStickers({
        ...sticker,
        x: positionX,
        y: positionY,
      });
    }
  };

  return (
    <>
      <Moveable
        target={targetElem}
        draggable={true}
        onDrag={({ target, transform }) => {
          target.style.transform = transform;
        }}
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
