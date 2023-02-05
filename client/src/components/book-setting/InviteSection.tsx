import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";

const InviteSection = () => {
  return (
    <InviteContainer>
      <div className="m-auto">
        <p className="text-center text-[2.5vh]">일기장을 공유하고 싶은 분을 초대해보세요!</p>
        <div className="flex h-[2vh] mt-[1.5vh]">
          <InviteCodeButton>
            <img src={require("../../assets/icons/refresh.png")} />
            <p className="ml-1 text-[1.5vh]">초대코드 재생성</p>
          </InviteCodeButton>
        </div>
        <div className="flex">
          <InviteCodeButton>
            <p className="mt-1 text-[2.5vh]">📎1BBBBB</p>
          </InviteCodeButton>
        </div>
      </div>
    </InviteContainer>
  );
};

export default InviteSection;

const InviteContainer = tw.div`
flex bg-white/60 rounded-lg shadow-lg 
mx-auto my-[2vh] w-[90%] h-[18vh]
`;

const InviteCodeButton = tw.div`
flex mx-auto text-center cursor-pointer hover:opacity-50
drop-shadow-lg hover:drop-shadow-none ease-in duration-300
`;
