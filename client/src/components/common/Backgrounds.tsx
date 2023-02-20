import tw from "tailwind-styled-components";

export const PinkPurpleBackground = tw.div`
  w-[calc(100vh/16*9)] h-screen m-auto relative
  bg-gradient-radial from-bg-pink via-bg-middle-purple to-bg-purple
`;

export const DefaultBackground = tw.div`
  w-[calc(100vh/16*9)] h-screen m-auto relative
`;
