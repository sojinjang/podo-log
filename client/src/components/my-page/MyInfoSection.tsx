import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import { accessTokenAtom } from "src/recoil/token";
import { get } from "src/utils/api";
import changeToKoreanDate from "src/utils/date";
import { API_URL } from "src/constants/API_URL";
import defaultProfileImg from "../../assets/icons/default_profile.png";
import { UnclickableContainer } from "../common/UnclickableContainer";

interface UserData {
  nickname: string;
  profile: string;
  provider: "local" | "kakao" | "naver";
  createdAt: Date;
}

export const MyInfoSection = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImg, setProfileImg] = useState<string>("");

  const getUserData = async () => {
    try {
      const response = await get(API_URL.users, "", accessToken);
      setUserData(response.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setProfileImg(userData?.profile === "없음" ? defaultProfileImg : userData?.profile);
  }, [userData]);

  return (
    <>
      {userData && (
        <UnclickableContainer className="mt-[3vh] p-[2vh]">
          <div className="flex">
            <ProfileImg src={profileImg} />
            <InfoContainer>
              <InfoLine>
                <InfoTitle>닉네임</InfoTitle>
                <Info>{userData.nickname}</Info>
              </InfoLine>
              <InfoLine>
                <InfoTitle>가입 경로</InfoTitle>
                <Info>{userData.provider}</Info>
              </InfoLine>
              <InfoLine>
                <InfoTitle>가입일</InfoTitle>
                <Info>{changeToKoreanDate(userData.createdAt)}</Info>
              </InfoLine>
            </InfoContainer>
            <div className="inline-block">
              <EditButton>정보 수정</EditButton>
            </div>
          </div>
        </UnclickableContainer>
      )}
    </>
  );
};

const ProfileImg = tw.img`
w-[8vh] h-[8vh]
rounded-full object-cover shadow-lg mx-[1vh]
`;

const InfoContainer = tw.div`
flex flex-col ml-[1vh] my-auto mr-auto
`;

const InfoLine = tw.div`
flex w-[25vh]
`;

const InfoTitle = tw.p`
font-sans text-[1.5vh] text-[#959595] font-medium w-[7vh]
`;

const Info = tw.p`
font-sans text-[1.5vh]
`;

const EditButton = tw.p`
font-sans text-[1.5vh] text-[#959595] font-medium cursor-pointer
drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300
`;
