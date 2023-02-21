import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

import ClickableContainer from "../common/ClickableContainer";
import { BookIdType } from "src/pages/BookSetting";

const BookRevisionButton = ({ bookId }: BookIdType) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickRevisionButton = () => {
    navigate(
      `${PRIVATE_ROUTE.books.path}/${bookId}/${
        PRIVATE_ROUTE.bookRevision.path.split("/").reverse()[0]
      }
        `,
      {
        state: {
          name: location.state.name,
          color: location.state.color,
        },
      }
    );
  };

  return <ClickableContainer onClick={onClickRevisionButton}>일기장 수정</ClickableContainer>;
};

export default BookRevisionButton;
