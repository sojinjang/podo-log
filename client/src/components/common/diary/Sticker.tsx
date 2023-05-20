import { useCallback, useEffect, useState } from "react";
import Moveable, { OnDragStart, OnDrag, OnDragEnd } from "react-moveable";

import { convertToAbsCoord, convertToRelativeCoord } from "src/utils/convertCoord";
import * as S from "src/styles/Diary";

export interface AffixedStickerInfo {
  stickedStickerId: number;
  stickerImg: string;
  locX: number;
  locY: number;
}
// TODO: response 유틸리티 타입으로 분리

interface AffixedStickerProps {
  sticker: AffixedStickerInfo;
  handleUpdateStickers: (newSticker: AffixedStickerInfo) => void;
}

export const AffixedSticker = ({ sticker, handleUpdateStickers }: AffixedStickerProps) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  useEffect(() => {
    const targetElem = document.querySelector(
      `.target-${sticker.stickedStickerId}`
    ) as HTMLElement;
    targetElem.style.transform = `translate(${sticker.locX}vh, ${sticker.locY}vh`;
    setTargetElem(targetElem);
  }, []);

  const hideMovableBoxStyle = useCallback(() => {
    const moveableControlBoxArr = Array.from(
      document.querySelectorAll<HTMLElement>(`.moveable-control-box`)
    );
    moveableControlBoxArr.map((moveableBox) => {
      return (moveableBox.style.visibility = "hidden");
    });
  }, [targetElem]);
  useEffect(hideMovableBoxStyle, [targetElem]);

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
      <S.MoveableStickerContainer className={`target-${sticker.stickedStickerId}`}>
        <S.StickerImg alt="sticker" src={sticker.stickerImg} />
      </S.MoveableStickerContainer>
    </>
  );
};
