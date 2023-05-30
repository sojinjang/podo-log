import { useNavigate } from "react-router-dom";

import { BookInfo } from "src/@types/response";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import * as S from "../../styles/BookList";

const BookButton = ({ bookId, bookName, numMembers, color }: BookInfo) => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.books.path + "/" + bookId, {
      state: {
        name: bookName,
        numMembers: numMembers,
        color: color,
      },
    });
  };

  return (
    <S.BookButtonContainer>
      <picture>
        <source srcSet={require(`../../assets/book/${color}.webp`)} type="image/webp" />
        <img
          src={require(`../../assets/book/${color}.png`)}
          alt="book"
          onClick={onClickImg}
          className="w-[15vh] h-[15vh] m-auto max-w-xs"
        />
      </picture>
      <S.BookDescription>
        <div className="font-[jua]">{bookName}</div>
        <div className="font-[jua] text-gray-1000 ml-2">{numMembers}</div>
      </S.BookDescription>
    </S.BookButtonContainer>
  );
};

export default BookButton;
