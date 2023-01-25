import React from "react";
import tw from "tailwind-styled-components";

interface TitleProps {
  readonly title: string;
}

const Title = tw.div`
  font-[jua] text-[3vh] md:text-[2.5vh] m-auto pt-[15px] 
`;

const PageTitle = ({ title }: TitleProps) => {
  return (
    <div className="flex h-[70px]">
      <Title>{title}</Title>
    </div>
  );
};

export default PageTitle;
