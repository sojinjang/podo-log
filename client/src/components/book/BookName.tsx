import React from "react";
import { useLocation } from "react-router-dom";

import PageTitle from "../common/PageTitle";
import * as S from "../../styles/Book";

const BookName = () => {
  const location = useLocation();
  const bookName = location.state.name;
  const numMembers = location.state.numMembers;

  return (
    <div className="flex justify-center">
      <PageTitle title={bookName} />
      <S.NumMember>{numMembers}</S.NumMember>
    </div>
  );
};

export default BookName;
