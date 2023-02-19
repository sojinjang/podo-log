import React from "react";
import tw from "tailwind-styled-components";

const GrapeInfo = () => {
  return (
    <GrapeInfoContainer>
      <DescContainer>
        <DescGrape className="mr-[1vh]">내가 모은 포도송이</DescGrape>
        <DescGrape className="text-[#80A40E]">1</DescGrape>
        <DescGrape>개</DescGrape>
      </DescContainer>
      <DescContainer>
        <DescGrapeAndGrain className="text-[#8687bd] mr-[1vh]">1</DescGrapeAndGrain>
        <DescGrapeAndGrain className="mr-[1vh]">포도송이,</DescGrapeAndGrain>
        <DescGrapeAndGrain className="text-[#8687bd] mr-[1vh]">5</DescGrapeAndGrain>
        <DescGrapeAndGrain>포도알</DescGrapeAndGrain>
      </DescContainer>
    </GrapeInfoContainer>
  );
};

export default GrapeInfo;

const GrapeInfoContainer = tw.div`
flex flex-col pt-[8vh]
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
