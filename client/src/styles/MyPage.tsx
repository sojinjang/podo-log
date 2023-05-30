import tw from "tailwind-styled-components";

export const CodeSectionTitle = tw.p`
  font-sans text-[1.5vh] text-[#959595]
`;

export const CodeInputContainer = tw.div`
  font-sans text-[1.5vh] bg-white/60 rounded-lg shadow-lg
  mx-auto md:p-5 p-3
`;

export const PostButton = tw.button` 
  font-sans w-[10%] ml-auto cursor-pointer text-center
  text-purple-1000 hover:opacity-50 ease-in duration-300
`;

export const ProfileImg = tw.img`
  w-[8vh] h-[8vh]
  rounded-full object-cover shadow-lg mx-[1vh]
`;

export const InfoContainer = tw.div`
  flex flex-col ml-[1vh] my-auto mr-auto
`;

export const InfoLine = tw.div`
  flex w-[25vh]
`;

export const InfoTitle = tw.p`
  font-sans text-[1.5vh] text-[#959595] font-medium w-[7vh]
`;

export const Info = tw.p`
  font-sans text-[1.5vh]
`;

export const Button = tw.p`
  font-sans text-[1.5vh] text-[#959595] font-medium cursor-pointer
  drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300
`;
