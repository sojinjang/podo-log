import tw from "tailwind-styled-components";

export const NumMember = tw.div`
font-[jua] text-gray-1000 text-[3vh] md:text-[2.7vh] mx-3 my-auto pt-[1.2vh]
`;

export const ContainerStyle = `
cursor-pointer mb-[2vh]
hover:shadow-none ease-in duration-200
`;

export const CommentContainer = tw.div`
flex justify-end 
`;

export const CommentIcon = tw.picture`
w-[2.5vh] h-[2.5vh] my-auto
`;

export const NumComments = tw.p`
text-[2.2vh] md:text-[2vh] ml-1 my-auto
`;

export const ButtonContainer = tw.div`
flex justify-center w-[90%] h-[8%] mx-auto my-[2vh]
bg-white/60 rounded-lg 
hover:border-dashed hover:border-black/80 hover:border-[2.5px]
shadow-lg hover:shadow-none ease-in duration-200
`;

export const PencilIcon = tw.img`
h-[2.64vh] my-auto mr-[1vw] md:mr-[0.5vw]
`;

export const ButtonDescription = tw.p`
text-[2.2vh] md:text-[2vh] my-auto
`;

export const SettingButtonImg = tw.img`
  h-[4.5vh] absolute top-[2vh] right-[1.4vh] cursor-pointer
`;
