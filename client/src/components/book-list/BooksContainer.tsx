import Fade from "react-reveal/Fade";

import { BooksArr } from "src/@types/response";
import HeartDiaryButton from "src/components/book-list/HeartDiaryButton";
import BookButton from "src/components/book-list/BookButton";
import NewBookButton from "./NewBookButton";

interface BookContainerProps {
  isEmpty: boolean;
  userBooksArr: BooksArr;
}

const renderBookButtons = (userBooksArr: BooksArr): JSX.Element[] | undefined => {
  const bookButtons = userBooksArr?.map((book) => {
    return (
      <BookButton
        key={book.bookId}
        bookId={book.bookId}
        bookName={book.bookName}
        numMembers={book.numMembers}
        color={book.color}
      />
    );
  });
  return bookButtons;
};

const BooksContainer = ({ isEmpty, userBooksArr }: BookContainerProps) => {
  if (isEmpty) return <HeartDiaryButton />;
  return (
    <Fade duration={3000}>
      <div className="flex flex-wrap justify-center mt-[3vh]">
        {renderBookButtons(userBooksArr)}
        <NewBookButton />
      </div>
    </Fade>
  );
};

export default BooksContainer;
