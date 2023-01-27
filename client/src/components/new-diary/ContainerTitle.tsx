import React from "react";

interface TitleProps {
  children: string;
}

const ContainerTitle = ({ children }: TitleProps) => {
  return (
    <div className="font-[notosans] font-bold ml-[4vw] mt-[2vh] text-[2.5vh] md:text-[2vh]">
      {children}
    </div>
  );
};

export default ContainerTitle;
