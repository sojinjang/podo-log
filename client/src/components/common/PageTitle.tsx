import React from "react";
import tw from "tailwind-styled-components";

interface TitleProps {
  readonly title: string;
}

const Title = tw.div`
  font-[jua] text-[2.7vh] m-auto pt-[1vh]
`;

const PageTitle = ({ title }: TitleProps) => {
  return (
    <div className="flex h-[7.5vh]">
      <Title>{title}</Title>
    </div>
  );
};

export default PageTitle;
