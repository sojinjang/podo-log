import tw from "tailwind-styled-components";

export const Phrase = tw.p`
  font-sans text-slate-50 font-black text-[4vh] 
  text-center drop-shadow-xl pt-[4vh] sm:pt-[5vh]`;

export const SignUpPhrase = tw.p`
  font-sans font-semibold text-slate-50 text-sm sm:text-lg
  cursor-pointer underline drop-shadow-lg shadow-black text-center
`;

export const SNSLoginButtonBg = tw.div`
  relative w-[5vh] h-[5vh] rounded-full m-auto mb-[2vh] cursor-pointer
`;

export const Divider = tw.hr`
  w-full h-[3px] mx-auto mt-4 bg-slate-50/80 rounded md:mt-10
`;

export const SectionDescription = tw.p`
  font-sans font-semibold text-slate-50/80 text-[1.5vh] my-4
`;

export const IconContainer = tw.div`
  flex mx-auto w-[50%]
`;

export const PwConfirmMsg = tw.p`
  font-sans text-red-600 text-xs sm:text-base mt-1 ml-[5px]
`;
