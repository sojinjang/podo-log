import { useRecoilValue } from "recoil";

import { selectedColorAtom } from "src/recoil/book-color";
import * as S from "src/styles/Book";

const BookIcon = () => {
  const selectedColor = useRecoilValue(selectedColorAtom);
  return (
    <picture>
      <source srcSet={require(`src/assets/book/${selectedColor}.webp`)} type="image/webp" />
      <S.BookImg alt="book" src={require(`src/assets/book/${selectedColor}.png`)} />
    </picture>
  );
};

export default BookIcon;
