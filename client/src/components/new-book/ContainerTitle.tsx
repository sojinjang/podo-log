import React from "react";

interface TitleProps {
  children: string;
}

const ContainerTitle = ({ children }: TitleProps) => {
  return (
    <div className="font-sans font-bold w-[75%] mx-auto mt-[2vh] text-[2vh]">{children}</div>
  );
};

export default ContainerTitle;
