import React, { useState } from "react";
import Moveable from "react-moveable";
import { useDidMountEffect } from "src/utils/hooks";

interface DraggableStickerProps {
  id: string;
  stickerImg: string;
}

const MoveableSticker = ({ id, stickerImg }: DraggableStickerProps) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  const [style, setStyle] = useState("");

  useDidMountEffect(() => {
    const targetElem = document.querySelector(`.target-${id}`) as HTMLElement;
    // targetElem.style.transform = `translate(${(508 / 1385) * 100}vh, ${(95 / 1385) * 100}vh)`;
    setTargetElem(targetElem);
  }, []);

  return (
    <>
      <Moveable
        target={targetElem}
        draggable={true}
        onDrag={({ target, transform }) => {
          target.style.transform = transform;
        }}
        onDragEnd={({ target }) => {
          setStyle(target.style.transform);
          //   target.style.transform = style;
        }}
      />
      <img className={`target-${id} h-[10vh] absolute cursor-pointer`} src={stickerImg} />
    </>
  );
};

export default MoveableSticker;
