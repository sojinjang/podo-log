import React from "react";
import ClickableContainer from "src/components/common/ClickableContainer";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Navbar } from "src/components/common/NavBar";
import PageTitle from "src/components/common/PageTitle";
import { MyInfoSection } from "src/components/my-page/MyInfoSection";
import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { useRecoilState } from "recoil";

const MyPage = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const handleSignOut = async () => {
    try {
      await post(API_URL.signOut, {}, accessToken);
      setAccessToken(undefined);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <>
      <PinkPurpleBackground>
        <PageTitle title="마이 페이지" />
        <ClickableContainer onClick={handleSignOut}>로그아웃</ClickableContainer>
      </PinkPurpleBackground>
      <Navbar activeMenu="myPage" />
    </>
  );
};

export default MyPage;
