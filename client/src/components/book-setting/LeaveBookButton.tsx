import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { accessTokenAtom } from "src/recoil/token";
import { del } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import ClickableContainer from "../common/ClickableContainer";
import { BookIdType } from "src/pages/BookSetting";

const LeaveBookButton = ({ bookId }: BookIdType) => {
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenAtom);
  const leaveBook = async () => {
    try {
      await del(API_URL.books, String(bookId), accessToken);
      navigate(PRIVATE_ROUTE.books.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };
  return (
    <ClickableContainer
      onClick={() => {
        if (confirm("정말 일기장을 나가시겠습니까? 🥺")) leaveBook();
      }}
    >
      일기장 나가기
    </ClickableContainer>
  );
};

export default LeaveBookButton;
