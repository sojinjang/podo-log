import { useRef, useState, useEffect } from "react";

import { MyGrape, StickerPack } from "src/@types/response";
import { DefaultBackground } from "src/styles/Common";
import { Navbar } from "src/components/common/NavBar";
import MoveBtn from "src/components/grape/MoveBtn";
import GrapeInfo from "src/components/grape/GrapeInfo";
import MyGrapeNum from "src/components/grape/MyGrapeNum";
import { StickerPackList } from "src/components/grape/StickerPackList";
import PackageDetail from "src/components/grape/PackageDetail";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
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
          <GrapeInfo data={myGrape} ref={grapeRef} />
          <MoveBtn stickerShopRef={stickerShopRef} isMoveDown={true} />
          <div className="h-[17vh] w-screen" />
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
