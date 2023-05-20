import tw from "tailwind-styled-components";

export const PinkPurpleBackground = tw.div`
  w-[calc(100vh/16*9)] h-screen m-auto relative
  bg-gradient-radial from-bg-pink via-bg-middle-purple to-bg-purple
`;

export const DefaultBackground = tw.div`
  w-[calc(100vh/16*9)] h-screen m-auto relative
`;

export const ClickableContainer = tw.div`
font-sans text-[1.7vh] bg-white/60 rounded-lg cursor-pointer
shadow-lg hover:shadow-none ease-in duration-300
mx-auto mb-[1.5vh] w-[90%] md:p-5 p-3
`;

export const UnclickableContainer = tw.div`
relative bg-white/60 rounded-lg shadow-lg
mx-auto w-[90%] p-[3vh] overflow-hidden
`;

export const InputSectionContainer = tw.div`
backdrop-blur-3xl border-4 bg-slate-50/5 border-slate-50/80 rounded-xl 
w-[80%] py-[2vh] mt-[2vh] min-[390px]:mt-[6vh] mx-auto
`;

export const Input = tw.input`
font-sans bg-transparent text-[1.5vh] w-[85%]
`;

export const InputContainer = tw.div`
w-[65%] flex flex-col rounded-md bg-white/40 p-[1vh] mx-auto mt-[1.5vh]
`;

export const BarContainer = tw.div`
  flex justify-around px-12 mx-auto w-[46.8vh] h-[7vh] bg-white/60 rounded-2xl 
  fixed left-1/2 -translate-x-1/2 bottom-[3.5vh] shadow-lg
`;

export const Container = tw.div`
  cursor-pointer drop-shadow-xl hover:drop-shadow-none transition ease-in duration-300
`;

export const IconImg = tw.img`
  m-auto w-[3.5vh] h-[3.5vh]
`;

export const Description = tw.div`
  text-center font-[jua] text-[1vh]
`;

export const ProfileImg = tw.img`
w-[10vh] h-[10vh] object-cover shadow-lg mx-auto my-2 rounded-full bg-white
`;

export const ProfileImgDescription = tw.label`
cursor-pointer text-purple-1000 text-[1.4vh]
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;
