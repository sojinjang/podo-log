import { useState, useEffect, useCallback } from "react";
import { OnDragStart, OnDrag, OnDragEnd } from "react-moveable";
import { EditingStickerInfo } from "src/@types/diary";
import { AffixedStickerInfo } from "src/@types/response";
import { convertToAbsCoord, convertToRelativeCoord } from "src/utils/convertCoord";

const useMovableSticker = <T extends EditingStickerInfo | AffixedStickerInfo>(
  isEditing: boolean,
  sticker: T,
  handleUpdateStickers: (newSticker: T) => void
) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  const hideMovableBoxStyle = useCallback(() => {
    const moveableControlBoxArr = Array.from(
      document.querySelectorAll<HTMLElement>(`.moveable-control-box`)
    );
    moveableControlBoxArr.map((moveableBox) => {
      return (moveableBox.style.visibility = "hidden");
    });
  }, [targetElem]);

  useEffect(() => {
    const targetElem = document.querySelector(
      `.target-${sticker.stickedStickerId}`
    ) as HTMLElement;
    targetElem.style.transform = `translate(${sticker.locX}vh, ${sticker.locY}vh`;
    setTargetElem(targetElem);
  }, []);
  useEffect(() => {
    if (isEditing) return;
    hideMovableBoxStyle();
  }, [targetElem]);

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

  return { targetElem, handleDragStart, handleOnDrag, handleDragEnd };
};

export default useMovableSticker;
