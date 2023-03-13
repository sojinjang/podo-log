import React from "react";
import { useNavigate } from "react-router-dom";

import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import ClickableContainer from "../common/ClickableContainer";
import { BookIdType } from "src/pages/BookSetting";

const LeaveBookButton = ({ bookId }: BookIdType) => {
  const navigate = useNavigate();
  const leaveBook = async () => {
    try {
      await api.delete(API_URL.books + `/${bookId}`);
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
