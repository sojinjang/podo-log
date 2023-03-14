import React from "react";
import { useSetRecoilState } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import ClickableContainer from "src/components/common/ClickableContainer";

const SignOutButton = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleSignOut = async () => {
    try {
      await api.post(API_URL.signOut, {});
      setAccessToken(undefined);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return <ClickableContainer onClick={handleSignOut}>로그아웃</ClickableContainer>;
};

export default SignOutButton;
