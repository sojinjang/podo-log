import { useRef, useState, useEffect } from "react";

import { MyGrape, StickerPack } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { Navbar } from "src/components/common";
import {
  MoveBtn,
  GrapeInfo,
  MyGrapeNum,
  StickerPackList,
  PackageDetail,
} from "src/components/grape/";
import { DefaultBackground } from "src/styles/Common";
import * as S from "../styles/Grape";

const Grape = () => {
  const grapeRef = useRef<HTMLDivElement>(null);
  const stickerShopRef = useRef<HTMLDivElement>(null);
  const [myGrape, setMyGrape] = useState<MyGrape | null>(null);
  const [focusedPack, setFocusedPack] = useState<StickerPack | null>(null);

  const updateFocusedPack = (pack: StickerPack | null) => {
    setFocusedPack(pack);
  };

  const resetFocusedPack = () => {
    setFocusedPack(null);
  };

  const deductGrape = () => {
    setMyGrape((prev) => {
      if (prev) return { grape: prev.grape - 1, grain: prev.grain };
      return prev;
    });
  };

  const getMyGrapeData = async () => {
    try {
      const { data } = await api.get(API_URL.grape);
      const { grain, grape } = data.data;
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
        <div className="h-screen">
          <GrapeInfo data={myGrape} grapeRef={grapeRef} />
          <MoveBtn stickerShopRef={stickerShopRef} isMoveDown={true} />
          <div className="h-[17vh]" />
        </div>
        <S.StickerShopContainer ref={stickerShopRef}>
          <MoveBtn grapeRef={grapeRef} isMoveDown={false} />
          {myGrape && <MyGrapeNum grape={myGrape.grape} />}
          {focusedPack && myGrape ? (
            <PackageDetail
              focusedPack={focusedPack}
              resetFocusedPack={resetFocusedPack}
              numGrape={myGrape.grape}
              deductGrape={deductGrape}
            />
          ) : (
            <StickerPackList updateFocusedPack={updateFocusedPack} />
          )}
        </S.StickerShopContainer>
      </DefaultBackground>
      <Navbar activeMenu="grape" />
    </div>
  );
};

export default Grape;
