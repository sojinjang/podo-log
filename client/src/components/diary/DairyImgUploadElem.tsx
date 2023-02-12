import tw from "tailwind-styled-components";

export const UploadedImg = tw.img`
max-w-[80%] mx-auto
`;

export const ImgUploadContainer = tw.div`
flex bg-[#F0F0F0] w-[65%] h-[35%] mx-auto rounded-xl cursor-pointer
hover:opacity-70 transition duration-500 ease-in-out
`;

export const ImgUploadIcon = tw.img`
w-[15%] m-auto
`;

export const TrashCanIcon = tw.img`
w-[5%] absolute right-[12%] top-[1vh] cursor-pointer
drop-shadow-2xl hover:drop-shadow-none transition ease-in duration-300
`;
