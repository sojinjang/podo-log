import React from "react";
import tw from "tailwind-styled-components";

import { patch } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { useRecoilState } from "recoil";

const WithdrawalButton = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);

  const handleWithdrawal = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 🥺")) return;
    try {
      await patch(API_URL.withdrawal, "", {}, accessToken);
      setAccessToken(undefined);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return <Button onClick={handleWithdrawal}>탈퇴하기</Button>;
};

export default WithdrawalButton;

const Button = tw.p`
font-sans text-[#959595] text-[1.7vh] mx-auto cursor-pointer
drop-shadow-lg hover:drop-shadow-none transition ease-in duration-300
`;
