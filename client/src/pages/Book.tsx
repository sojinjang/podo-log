import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";

const Book = () => {
  const params = useParams();
  const bookId = Number(params.bookId);

  const getDiaryList = async () => {
    try {
      const response = await get(API_URL.diaryList(bookId));
      return response;
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    getDiaryList();
  }, []);

  return (
    <PinkPurpleBackground>
      <BackButton />
    </PinkPurpleBackground>
  );
};

export default Book;
