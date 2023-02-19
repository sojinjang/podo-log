import React, { useRef } from "react";

import { DefaultBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import MoveBtn from "src/components/grape/MoveBtn";
import GrapeInfo from "../components/grape/GrapeInfo";

const Grape = () => {
  const grapeRef = useRef<HTMLDivElement>(null);
  const stickerShopRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <DefaultBackground className="h-[200vh] animated-grad-grape">
        <GrapeInfo ref={grapeRef} />
        <MoveBtn grapeRef={grapeRef} stickerShopRef={stickerShopRef} isMoveDown={true} />
        <div className="h-[13vh] w-screen" />
        <div ref={stickerShopRef}>스티커샵</div>
      </DefaultBackground>
      <Navbar activeMenu="grape" />
    </div>
  );
};

export default Grape;
