import React from "react";
import tw from "tailwind-styled-components";
import Tada from "react-reveal/Tada";

const GrapeInfo = () => {
  return (
    <GrapeInfoContainer>
      <DescContainer>
        <DescGrape className="mr-[1vh]">내가 모은 포도송이</DescGrape>
        <Tada duration={2000}>
          <DescGrape className="text-[#BB86FC]">1</DescGrape>
        </Tada>
        <DescGrape>개</DescGrape>
      </DescContainer>
      <DescContainer>
        <DescGrapeAndGrain className="text-[#8687bd] mr-[1vh]">1</DescGrapeAndGrain>
        <DescGrapeAndGrain className="mr-[1vh]">포도송이,</DescGrapeAndGrain>
        <DescGrapeAndGrain className="text-[#8687bd] mr-[1vh]">5</DescGrapeAndGrain>
        <DescGrapeAndGrain>포도알</DescGrapeAndGrain>
      </DescContainer>
      <Tada duration={2000}>
        <GrapeImg src={require("../../assets/grape/grape_5.png")} />
      </Tada>
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

const GrapeImg = tw.img`
mx-auto drop-shadow-2xl mt-[15vh] w-[25vh] h-[25vh]
`;
