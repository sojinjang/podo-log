import React, { useState } from "react";
import Moveable from "react-moveable";
import { useDidMountEffect } from "src/utils/hooks";

interface DraggableStickerProps {
  stickerImg: string;
}

const MoveableSticker = ({ stickerImg }: DraggableStickerProps) => {
  const [targetElem, setTargetElem] = useState<HTMLElement | SVGElement | null>(null);
  const [style, setStyle] = useState("");

  useDidMountEffect(() => {
    const targetElem = document.querySelector(".target") as HTMLElement;
    // target.style.transform = `translate(${style.translate[0]}px, ${style.translate[1]}px)`;
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
      <div className="target z-10 absolute cursor-pointer">
        <img className="h-[10vh]" src={stickerImg} />
      </div>
    </>
  );
};

export default MoveableSticker;
