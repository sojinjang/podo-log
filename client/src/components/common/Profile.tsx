import tw from "tailwind-styled-components";

export const ProfileImg = tw.img`
w-[10vh] h-[10vh] object-cover shadow-lg mx-auto my-2 rounded-full bg-white
`;

export const ProfileImgDescription = tw.label`
cursor-pointer text-purple-1000 text-[1.4vh]
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;
