import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import Fade from "react-reveal/Fade";

import { BookIdType } from "src/pages/BookSetting";
import { accessTokenAtom } from "src/recoil/token";
import { get, patch } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { useDidMountEffect } from "src/utils/hooks";

const InviteSection = ({ bookId }: BookIdType) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [inviteCode, setInviteCode] = useState<string>("");
  const [isCopied, setIscopied] = useState<boolean>(false);

  const getInviteCode = async () => {
    try {
      const response = await get(API_URL.inviteCode(bookId), "", accessToken);
      setInviteCode(response.data.invttCode);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const renewInviteCode = async () => {
    try {
      const response = await patch(API_URL.inviteCode(bookId), "", {}, accessToken);
      setInviteCode(response.data.invttCode);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIscopied(true);
      setTimeout(() => {
        setIscopied(false);
      }, 1500);
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  useDidMountEffect(getInviteCode, []);

  return (
    <InviteContainer>
      <div className="m-auto">
        <p className="text-center text-[2.5vh]">일기장을 공유하고 싶은 분을 초대해보세요!</p>
        <div className="flex h-[2vh] mt-[1.5vh]">
          <InviteCodeButton onClick={renewInviteCode}>
            <img src={require("../../assets/icons/refresh.png")} />
            <p className="ml-1 text-[1.5vh]">초대코드 갱신</p>
          </InviteCodeButton>
        </div>
        <div className="flex">
          <InviteCodeButton
            onClick={() => {
              handleCopyClipBoard(inviteCode);
            }}
          >
            <p className="mt-1 text-[2.5vh]">📎{inviteCode}</p>
          </InviteCodeButton>
        </div>
        {isCopied && (
          <Fade bottom duration={1300}>
            <CopySuccessMessage>클립보드 복사 완료 🧚</CopySuccessMessage>
          </Fade>
        )}
      </div>
    </InviteContainer>
  );
};

export default InviteSection;

const InviteContainer = tw.div`
flex bg-white/60 rounded-lg shadow-lg 
mx-auto my-[2vh] w-[90%] py-[3vh] 
`;

const InviteCodeButton = tw.div`
flex mx-auto text-center cursor-pointer hover:opacity-50
drop-shadow-lg hover:drop-shadow-none ease-in duration-300
`;

const CopySuccessMessage = tw.p`
mx-auto text-center mt-1 text-[1.2vh]
`;
