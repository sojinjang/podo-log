import { useNavigate } from "react-router-dom";

import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import plusImg from "../../assets/icons/plus.png";
import * as S from "../../styles/BookList";

const NewBookButton = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.newBook.path);
  };

  return (
    <S.BookButtonContainer>
      <S.PlusImg src={plusImg} alt="new-book" onClick={onClickImg} />
      <S.BookDescription className="text-gray-1000">새 일기장 만들기</S.BookDescription>
    </S.BookButtonContainer>
  );
};

export default NewBookButton;
