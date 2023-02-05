import React from "react";
import tw from "tailwind-styled-components";
import { MemberInfo } from "./BookMembersInfo";

const MemberProfile = ({ profile, nickname, isMe }: MemberInfo) => {
  return (
    <ProfileContainer>
      <ProfileImg src={profile}></ProfileImg>
      <Nickname>{nickname}</Nickname>
      {isMe && <Nickname>(me!)</Nickname>}
    </ProfileContainer>
  );
};

export default MemberProfile;

const ProfileContainer = tw.div`
flex md:mt-4 mt-2 md:mb-2 mb-1
`;

const ProfileImg = tw.img`
w-[40px] h-[40px] min-[390px]:w-[55px] min-[390px]:h-[55px] md:w-[60px] md:h-[60px] 
rounded-full object-cover shadow-lg mr-2 md:mr-4
`;

const Nickname = tw.p`
my-auto font-[notosans] text-[1.5vh]
`;
