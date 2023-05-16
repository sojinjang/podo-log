import React from "react";
import tw from "tailwind-styled-components";

import { MyGrape } from "src/@types/response";
import grapeImg from "../../assets/icons/colored_grape_353866.png";

const MyGrapeNum = ({ grape }: Pick<MyGrape, "grape">) => {
  return (
    <Container>
      <GrapeIcon alt="grape" src={grapeImg} />
      <GrapeNumDesc>{grape}송이</GrapeNumDesc>
    </Container>
  );
};

export default MyGrapeNum;

const Container = tw.div`
flex justify-end mr-[5vh] mb-[0.5vh] h-[2vh]
`;

const GrapeIcon = tw.img`
h-[2.2vh] my-auto mr-1.5
`;

const GrapeNumDesc = tw.div`
font-[jua] text-[#353866] text-[2vh] my-auto
`;
