import React from "react";
import Tada from "react-reveal/Tada";

import { MyGrape } from "src/@types/response";
import * as S from "../../styles/Grape";

interface GrapeInfo {
  data: MyGrape | null;
}

const GrapeInfo = React.forwardRef(function GrapeInfo(
  { data }: GrapeInfo,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <S.GrapeInfoContainer ref={ref}>
      <S.DescContainer>
        <S.DescGrape className="mr-[1vh]">내가 모은 포도송이</S.DescGrape>
        <Tada duration={2000}>
          <S.DescGrape className="text-[#BB86FC]">{data?.grape}</S.DescGrape>
        </Tada>
        <S.DescGrape>개</S.DescGrape>
      </S.DescContainer>
      <S.DescContainer>
        <S.NumGrapeAndGrain>{data?.grape}</S.NumGrapeAndGrain>
        <S.DescGrape className="mr-[1vh] text-[2.5vh]">포도송이,</S.DescGrape>
        <S.NumGrapeAndGrain>{data?.grain}</S.NumGrapeAndGrain>
        <S.DescGrape className="text-[2.5vh]">포도알</S.DescGrape>
      </S.DescContainer>
      {typeof data?.grain == "number" && (
        <Tada duration={2000}>
          <picture>
            <source
              srcSet={`${process.env.PUBLIC_URL}/assets/grape/grape_${data.grain}.webp`}
              type="image/webp"
            />
            <S.GrapeImg
              src={`${process.env.PUBLIC_URL}/assets/grape/grape_${data.grain}.png`}
              alt="내 포도알 이미지"
            />
          </picture>
        </Tada>
      )}
    </S.GrapeInfoContainer>
  );
});

export default GrapeInfo;
