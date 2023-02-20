import React, { useRef, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { DefaultBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import MoveBtn from "src/components/grape/MoveBtn";
import GrapeInfo from "../components/grape/GrapeInfo";
import MyGrapeNum from "src/components/grape/MyGrapeNum";
import { StickerShopContainer } from "src/components/grape/StickerShopContainer";
import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { StickerPackage, StickerPackList } from "src/components/grape/StickerPackList";
import PackageDetail from "src/components/grape/PackageDetail";

export interface MyGrape {
  grain: number;
  grape: number;
}

const Grape = () => {
  const grapeRef = useRef<HTMLDivElement>(null);
  const stickerShopRef = useRef<HTMLDivElement>(null);
  const [myGrape, setMyGrape] = useState<MyGrape | null>(null);
  const [focusedPack, setFocusedPack] = useState<StickerPackage | null>(null);
  const accessToken = useRecoilValue(accessTokenAtom);

  const updateFocusedPack = (pack: StickerPackage | null) => {
    setFocusedPack(pack);
  };

  const resetFocusedPack = () => {
    setFocusedPack(null);
  };

  const getMyGrapeData = async () => {
    try {
      const response = await get(API_URL.grape, "", accessToken);
      const { grain, grape } = response.data;
      setMyGrape({ grain, grape });
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getMyGrapeData();
  }, []);

  return (
    <div className="relative">
      <DefaultBackground className="h-[200vh] animated-grad-grape">
        <GrapeInfo data={myGrape} ref={grapeRef} />
        <MoveBtn stickerShopRef={stickerShopRef} isMoveDown={true} />
        <div className="h-[13vh] w-screen" />
        <StickerShopContainer ref={stickerShopRef}>
          <MoveBtn grapeRef={grapeRef} isMoveDown={false} />
          {myGrape && <MyGrapeNum grape={myGrape.grape} />}
          {focusedPack ? (
            <PackageDetail focusedPack={focusedPack} resetFocusedPack={resetFocusedPack} />
          ) : (
            <StickerPackList updateFocusedPack={updateFocusedPack} />
          )}
        </StickerShopContainer>
      </DefaultBackground>
      <Navbar activeMenu="grape" />
    </div>
  );
};

export default Grape;
