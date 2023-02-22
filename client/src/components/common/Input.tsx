import tw from "tailwind-styled-components";

export const InputSectionContainer = tw.div`
backdrop-blur-3xl border-4 bg-slate-50/5 border-slate-50/80 rounded-xl 
w-[80%] py-[2vh] mt-[2vh] min-[390px]:mt-[6vh] mx-auto
`;

export const Input = tw.input`
font-sans bg-transparent text-[1.3vh]
`;

export const InputContainer = tw.div`
w-[65%] flex flex-col rounded-md bg-white/40 p-[0.8vh] mx-auto mt-[1.5vh]
`;
