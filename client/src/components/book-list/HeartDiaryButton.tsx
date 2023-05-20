import React from "react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import heartDiaryWebP from "../../assets/icons/notebook_love.webp";
import heartDiaryPng from "../../assets/icons/notebook_love.png";
import * as S from "../../styles/BookList";

export const HeartDiaryButton = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate(PRIVATE_ROUTE.newBook.path);
  };

  return (
    <picture>
      <source srcSet={heartDiaryWebP} type="image/webp" />
      <S.HeartDiaryImg src={heartDiaryPng} alt="book" onClick={onClickImg} />
    </picture>
  );
};
