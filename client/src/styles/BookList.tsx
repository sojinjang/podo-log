import tw from "tailwind-styled-components";

export const BookDescription = tw.div`
  font-[jua] flex justify-center mb-5 text-[1.7vh]
`;

export const Phrase = tw.p`
  font-[jua] text-purple-1000 text-center text-[2.7vh] mt-[6vh]`;

export const HeartDiaryImg = tw.img`
  m-auto mt-[6vh] w-[20vh] h-[20vh] cursor-pointer max-w-xs 
  hover:scale-105 transition duration-500 ease-in-out
  `;

export const BookButtonContainer = tw.div`
  w-[34%] cursor-pointer hover:scale-105 transition duration-500 ease-in-out
`;

export const PlusImg = tw.img`
  w-[15vh] h-[15vh] m-auto max-w-xs
`;

export const PointingFingerImg = tw.img`
  mx-auto mt-[6vh] w-[10vh] h-[10vh] animate-bounce
`;
