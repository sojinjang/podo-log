import React from "react";
import tw from "tailwind-styled-components";

const Phrase = tw.p`
  font-sans text-slate-50 font-black text-[4vh] 
  text-center drop-shadow-xl pt-[4vh] sm:pt-[5vh]`;

export const Greeting = () => {
  return (
    <Phrase>
      Welcome to
      <br />
      PODO LOG
    </Phrase>
  );
};
