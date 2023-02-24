import tw from "tailwind-styled-components";

export const DiaryForm = tw.form`
h-[80vh] w-[80%] bg-white/60 m-auto rounded-xl mt-[3vh] overflow-y-scroll
`;

export const inputStyle = `
font-sans
bg-transparent p-4 sm:p-6 w-full
`;

export const TitleInput = tw.input`
text-xl sm:text-2xl font-semibold
`;

export const ContentInput = tw.textarea`
h-[30%] mt-[1vh] text-base sm:text-xl font-medium
`;
