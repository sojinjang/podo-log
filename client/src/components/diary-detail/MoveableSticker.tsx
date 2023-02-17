import React, { useState } from "react";
import tw from "tailwind-styled-components";
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
    targetElem.style.transform = `translate(${sticker.locX}vh, ${sticker.locY}vh`;
    setTargetElem(targetElem);
  }, []);

  const handleUpdateStickers = (newSticker: MoveableStickerInfo) => {
    setSelectedStickers((prevStickers) => {
      return [
        ...prevStickers.filter((sticker) => sticker.uniqueId !== newSticker.uniqueId),
        newSticker,
      ];
    });
  };

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
        <CancelImg src={require("../../assets/icons/x.png")} />
      </MoveableStickerContainer>
    </>
  );
};

export default MoveableSticker;

const MoveableStickerContainer = tw.div`
h-[8vh] z-10 flex absolute cursor-pointer
`;

const StickerImg = tw.img`
mt-2 mr-2
`;

const CancelImg = tw.img`
h-[2vh] absolute right-0 
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;
