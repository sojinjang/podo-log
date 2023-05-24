import { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";

import { BookInfo } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import refreshIcon from "src/assets/icons/refresh.png";
import * as S from "src/styles/BookSetting";

const InviteSection = ({ bookId }: Pick<BookInfo, "bookId">) => {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [isCopied, setIscopied] = useState<boolean>(false);

  const getInviteCode = async () => {
    try {
      const { data } = await api.get(API_URL.inviteCode(bookId));
      setInviteCode(data.data.invttCode);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const renewInviteCode = async () => {
    try {
      const { data } = await api.patch(API_URL.inviteCode(bookId), {});
      setInviteCode(data.data.invttCode);
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

  useEffect(() => {
    getInviteCode();
  }, []);

  return (
    <S.InviteContainer>
      <div className="m-auto">
        <p className="text-center text-[2.5vh]">일기장을 공유하고 싶은 분을 초대해보세요!</p>
        <div className="flex h-[2vh] mt-[1.5vh]">
          <S.InviteCodeButton onClick={renewInviteCode}>
            <img className="w-[2vh]" src={refreshIcon} />
            <p className="ml-1 text-[1.5vh]">초대코드 갱신</p>
          </S.InviteCodeButton>
        </div>
        <div className="flex">
          <S.InviteCodeButton
            onClick={() => {
              handleCopyClipBoard(inviteCode);
            }}
          >
            <p className="mt-1 text-[2.5vh]">📎{inviteCode}</p>
          </S.InviteCodeButton>
        </div>
        {isCopied && (
          <Fade bottom duration={1300}>
            <S.CopySuccessMessage>클립보드 복사 완료 🧚</S.CopySuccessMessage>
          </Fade>
        )}
      </div>
    </S.InviteContainer>
  );
};

export default InviteSection;
