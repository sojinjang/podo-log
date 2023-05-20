import { useRecoilValue } from "recoil";

import { selectedColorAtom } from "../../recoil/book-color";
import * as S from "../../styles/NewBook";

const BookIcon = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  return (
    <picture>
      <source srcSet={require(`../../assets/book/${selectedColor}.webp`)} type="image/webp" />
      <S.BookImg alt="book" src={require(`../../assets/book/${selectedColor}.png`)} />
    </picture>
  );
};

export default BookIcon;
