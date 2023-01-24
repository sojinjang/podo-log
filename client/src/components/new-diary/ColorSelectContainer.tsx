import React from "react";
import tw from "tailwind-styled-components";

const ColorSelectButton = tw.div`
    md:w-[65px] w-[35px] md:h-[65px] h-[35px] rounded-full m-auto mb-[2vh] cursor-pointer
`;

const ColorSelectContainer = () => {
  return (
    <div className="grid grid-cols-6 mt-[1.5vh] px-[5vw]">
      <ColorSelectButton className="bg-[#000000]" />
      <ColorSelectButton className="bg-[#008fff]" />
      <ColorSelectButton className="bg-[#50e3c2]" />
      <ColorSelectButton className="bg-[#82af20]" />
      <ColorSelectButton className="bg-[#6200ee]" />
      <ColorSelectButton className="bg-[#018786]" />
      <ColorSelectButton className="bg-[#309054]" />
      <ColorSelectButton className="bg-[#b00020]" />
      <ColorSelectButton className="bg-[#2c3f50]" />
      <ColorSelectButton className="bg-[#e054b8]" />
      <ColorSelectButton className="bg-[#e39801]" />
      <ColorSelectButton className="bg-[#ff5436]" />
    </div>
  );
};

export default ColorSelectContainer;
