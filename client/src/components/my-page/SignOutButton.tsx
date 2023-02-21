import React from "react";
import { useRecoilState } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import ClickableContainer from "src/components/common/ClickableContainer";

const SignOutButton = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const handleSignOut = async () => {
    try {
      await post(API_URL.signOut, {}, accessToken);
      setAccessToken(undefined);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return <ClickableContainer onClick={handleSignOut}>로그아웃</ClickableContainer>;
};

export default SignOutButton;
