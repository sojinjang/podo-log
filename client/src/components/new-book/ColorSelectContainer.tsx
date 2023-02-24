import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState, useResetRecoilState } from "recoil";

import { selectedColorAtom } from "../../recoil/book-color";
import { DIARY_COLOR } from "src/constants/DIARY_COLOR";

const renderColorSelectButtons = () => {
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorAtom);

  const colorSelectButtons = DIARY_COLOR.map((color) => {
    const isSelected = color === selectedColor;
    const borderStyle = isSelected
      ? "border-white border-dashed border-[0.5vh]"
      : "border-none";
    return (
      <ColorSelectButton
        key={color}
        id={color}
        className={`bg-[#${color}] ${borderStyle}`}
        onClick={() => setSelectedColor(color)}
      />
    );
  });

  return colorSelectButtons;
};

const ColorSelectContainer = () => {
  const resetSelectedColor = useResetRecoilState(selectedColorAtom);

  useEffect(() => {
    return () => {
      resetSelectedColor();
    };
  }, []);

  return (
    <div className="grid grid-cols-6 w-[75%] mx-auto mt-[1.5vh]">
      {renderColorSelectButtons()}
    </div>
  );
};

export default ColorSelectContainer;

const ColorSelectButton = tw.div`
w-[5vh] h-[5vh] rounded-full m-auto mb-[2vh] cursor-pointer
`;
