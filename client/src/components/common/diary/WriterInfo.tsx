import tw from "tailwind-styled-components";

export const ProfileImg = tw.img`
w-[40px] h-[40px] min-[390px]:w-[55px] min-[390px]:h-[55px] md:w-[58px] md:h-[58px] 
rounded-full object-cover shadow-lg 
`;

export const Nickname = tw.p`
text-[1.8vh] md:text-[1.7vh]
`;

export const Date = tw.p`
text-gray-1000 text-[1.4vh] md:text-[1.2vh]
`;
