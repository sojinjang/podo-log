import React from "react";
import { useParams } from "react-router-dom";

const Diary = () => {
  const params = useParams();
  const bookId = params.bookId;
  return <>Diary {bookId}</>;
};

export default Diary;
