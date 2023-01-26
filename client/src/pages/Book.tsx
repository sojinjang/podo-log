import React from "react";
import { useParams } from "react-router-dom";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";

const Book = () => {
  const params = useParams();
  const bookId = params.bookId;

  return (
    <PinkPurpleBackground>
      <BackButton />
    </PinkPurpleBackground>
  );
};

export default Book;
