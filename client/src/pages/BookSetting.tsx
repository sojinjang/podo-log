import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/styles/Common";
import { BackButton, PageTitle } from "src/components/common";
import {
  InviteSection,
  BookMembersInfo,
  LeaveBookButton,
  BookRevisionButton,
} from "src/components/book-setting";

const BookSetting = () => {
  const params = useParams();
  const bookId = Number(params.bookId);
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 설정"></PageTitle>
      <Fade bottom duration={1500}>
        <InviteSection bookId={bookId} />
        <BookMembersInfo bookId={bookId} />
        <BookRevisionButton bookId={bookId} />
        <LeaveBookButton bookId={bookId} />
      </Fade>
    </PinkPurpleBackground>
  );
};

export default BookSetting;
