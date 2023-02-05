import React from "react";
import { useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import InviteSection from "src/components/book-setting/InviteSection";
import { BookMembersInfo } from "src/components/book-setting/BookMembersInfo";
import LeaveBookButton from "src/components/book-setting/LeaveBookButton";
import BookRevisionButton from "src/components/book-setting/BookRevisionButton";

export interface BookIdType {
  bookId: number;
}

export const BookSetting = () => {
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
