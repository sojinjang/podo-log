import React from "react";
import tw from "tailwind-styled-components";
import { MemberInfo } from "./BookMembersInfo";
import defaultProfileImg from "../../assets/icons/default_profile.png";

const MemberProfile = ({ profile, nickname, isMe }: MemberInfo) => {
  const profileImg = profile === "없음" ? defaultProfileImg : profile;
  return (
    <ProfileContainer>
      <ProfileImg src={profileImg}></ProfileImg>
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
w-[37px] h-[37px] min-[390px]:w-[52px] min-[390px]:h-[52px] md:w-[65px] md:h-[65px] 
rounded-full object-cover shadow-lg mr-2 md:mr-3
`;

const Nickname = tw.p`
my-auto font-sans text-[1.6vh] mr-1 md:mr-2
`;
