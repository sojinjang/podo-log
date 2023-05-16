import React from "react";
import tw from "tailwind-styled-components";
import Tada from "react-reveal/Tada";
import { MyGrape } from "src/@types/response";

interface GrapeInfo {
  data: MyGrape | null;
}

const GrapeInfo = React.forwardRef(function GrapeInfo(
  { data }: GrapeInfo,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <GrapeInfoContainer ref={ref}>
      <DescContainer>
        <DescGrape className="mr-[1vh]">내가 모은 포도송이</DescGrape>
        <Tada duration={2000}>
          <DescGrape className="text-[#BB86FC]">{data?.grape}</DescGrape>
        </Tada>
        <DescGrape>개</DescGrape>
      </DescContainer>
      <DescContainer>
        <NumGrapeAndGrain>{data?.grape}</NumGrapeAndGrain>
        <DescGrapeAndGrain className="mr-[1vh]">포도송이,</DescGrapeAndGrain>
        <NumGrapeAndGrain>{data?.grain}</NumGrapeAndGrain>
        <DescGrapeAndGrain>포도알</DescGrapeAndGrain>
      </DescContainer>
      {typeof data?.grain == "number" && (
        <Tada duration={2000}>
          <picture>
            <source
              srcSet={`${process.env.PUBLIC_URL}/assets/grape/grape_${data.grain}.webp`}
              type="image/webp"
            />
            <GrapeImg
              src={`${process.env.PUBLIC_URL}/assets/grape/grape_${data.grain}.png`}
              alt="내 포도알 이미지"
            />
          </picture>
        </Tada>
      )}
    </GrapeInfoContainer>
  );
});

export default GrapeInfo;

const GrapeInfoContainer = tw.div`
flex flex-col pt-[8vh] h-[80vh]
`;

const DescContainer = tw.div`
flex justify-center
`;

const DescGrape = tw.p`
font-[jua] text-[3vh] text-[#353866]
`;

const DescGrapeAndGrain = tw.p`
font-[jua] text-[2.5vh] text-[#353866]
`;

const NumGrapeAndGrain = tw.p`
font-[jua] text-[2.5vh] text-[#8687bd] mr-[1vh]
`;

const GrapeImg = tw.img`
mx-auto drop-shadow-2xl mt-[15vh] w-[25vh] h-[25vh]
`;
