import React from "react";
import tw from "tailwind-styled-components";

import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { useSetRecoilState } from "recoil";

const WithdrawalButton = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleWithdrawal = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 🥺")) return;
    try {
      await api.patch(API_URL.withdrawal, {});
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
