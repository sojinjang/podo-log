import React from "react";
import { useNavigate } from "react-router-dom";

import { BookInfo } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import ClickableContainer from "../common/ClickableContainer";

const LeaveBookButton = ({ bookId }: Pick<BookInfo, "bookId">) => {
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
