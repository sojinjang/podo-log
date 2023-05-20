import React from "react";
import { useSetRecoilState } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import * as G from "src/styles/Common";

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

  return <G.ClickableContainer onClick={handleSignOut}>로그아웃</G.ClickableContainer>;
};

export default SignOutButton;
