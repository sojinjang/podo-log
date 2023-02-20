import React from "react";
import tw from "tailwind-styled-components";

export interface MyGrapeNumProps {
  grape: number;
}

const MyGrapeNum = ({ grape }: MyGrapeNumProps) => {
  return (
    <Container>
      <GrapeIcon src={require("../../assets/icons/colored_grape_353866.png")} />
      <GrapeNumDesc>{grape}개</GrapeNumDesc>
    </Container>
  );
};

export default MyGrapeNum;

const Container = tw.div`
flex justify-end mr-[5vh] mb-[1vh]
`;

const GrapeIcon = tw.img`
h-[2.5vh] my-auto mr-1.5
`;

const GrapeNumDesc = tw.p`
font-[jua] text-[#353866] text-[2vh] align-bottom
`;
