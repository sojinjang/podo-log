import { useNavigate, useLocation } from "react-router-dom";

import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { BookInfo } from "src/@types/response";
import * as G from "src/styles/Common";

const BookRevisionButton = ({ bookId }: Pick<BookInfo, "bookId">) => {
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

  return (
    <G.ClickableContainer onClick={onClickRevisionButton}>일기장 수정</G.ClickableContainer>
  );
};

export default BookRevisionButton;
