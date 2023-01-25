import React from "react";
import tw from "tailwind-styled-components";

const Phrase = tw.p`
  drop-shadow-xl font-[notosans] font-black text-[4vh] pt-[60px]
  bg-gradient-to-r from-blue-400 via-green-200/70 to-indigo-400 inline-block text-transparent bg-clip-text`;

export const Greeting = () => {
  return (
    <div className="text-center">
      <Phrase>
        Welcome to
        <br />
        podo-log
      </Phrase>
    </div>
  );
};
