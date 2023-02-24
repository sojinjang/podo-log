import React from "react";
import tw from "tailwind-styled-components";

const PostButton = () => {
  return (
    <div className="relative leading-[70px] align-middle">
      <Button form="diary">등록</Button>
    </div>
  );
};

export default PostButton;

const Button = tw.button`
  h-[70px] absolute md:right-[2vh] right-[1.8vh] m-auto md:pt-[0.8vh]
  font-sans text-[2.3vh] md:text-[1.8vh] cursor-pointer hover:opacity-50
  drop-shadow-xl hover:drop-shadow-none ease-in duration-300
`;
