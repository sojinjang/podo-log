import tw from "tailwind-styled-components";

export const BookMembersContainer = tw.div`
font-sans text-[1.7vh] bg-white/60 rounded-lg drop-shadow-lg
mx-auto mb-[1.5vh] w-[90%] md:p-5 p-3
`;

export const Divider = tw.hr`
w-full h-[2px] mx-auto mt-1 mb-2 bg-[#C7C7C7]
`;

export const InviteContainer = tw.div`
flex bg-white/60 rounded-lg shadow-lg 
mx-auto my-[2vh] w-[90%] py-[3vh] 
`;

export const InviteCodeButton = tw.div`
flex mx-auto text-center cursor-pointer hover:opacity-50
drop-shadow-lg hover:drop-shadow-none ease-in duration-300
`;

export const CopySuccessMessage = tw.p`
mx-auto text-center mt-1 text-[1.2vh]
`;

export const ProfileContainer = tw.div`
flex md:mt-4 mt-2 md:mb-2 mb-1
`;

// TODO: 삭제
export const ProfileImg = tw.img`
w-[4.7vh] h-[4.7vh]
rounded-full object-cover shadow-lg mr-2 md:mr-3
`;

export const Nickname = tw.p`
my-auto font-sans text-[1.6vh] mr-1 md:mr-2
`;
