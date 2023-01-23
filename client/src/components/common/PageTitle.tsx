import React from "react";
import tw from "tailwind-styled-components";

interface TitleProps {
  readonly title: string;
}

const Title = tw.div`
  font-[jua] text-3xl m-auto pt-[15px] 
`;

const PageTitle = ({ title }: TitleProps) => {
  return (
    <div className="flex h-[70px]">
      <Title>{title}</Title>
    </div>
  );
};

export default PageTitle;
