import React from "react";
import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";

import { selectedColorAtom } from "../../recoil/new-diary";

const DIARY_COLOR = [
  "000000",
  "008fff",
  "50e3c2",
  "82af20",
  "6200ee",
  "018786",
  "309054",
  "b00020",
  "2c3f50",
  "e054b8",
  "e39801",
  "ff5436",
];

const ColorSelectButton = tw.div`
md:w-[65px] w-[35px] md:h-[65px] h-[35px] rounded-full m-auto mb-[2vh] cursor-pointer
`;

const renderColorSelectButtons = () => {
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorAtom);

  const colorSelectButtons = DIARY_COLOR.map((color) => {
    const isSelected = color === selectedColor;
    const borderStyle = isSelected ? "border-white border-dashed border-[6px]" : "border-none";
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
  return (
    <div className="grid grid-cols-6 mt-[1.5vh] px-[5vw]">{renderColorSelectButtons()}</div>
  );
};

export default ColorSelectContainer;
