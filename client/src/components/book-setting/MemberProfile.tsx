import React from "react";
import tw from "tailwind-styled-components";
import defaultProfileImg from "../../assets/icons/default_profile.png";
import { MemberInfo } from "src/@types/response";

const MemberProfile = ({ profile, nickname, isMe }: Omit<MemberInfo, "userId">) => {
  const profileImg = profile === "없음" ? defaultProfileImg : profile;
  return (
    <ProfileContainer>
      <ProfileImg alt="profile" src={profileImg}></ProfileImg>
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
w-[4.7vh] h-[4.7vh]
rounded-full object-cover shadow-lg mr-2 md:mr-3
`;

const Nickname = tw.p`
my-auto font-sans text-[1.6vh] mr-1 md:mr-2
`;
