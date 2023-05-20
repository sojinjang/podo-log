import React from "react";
import { Link } from "react-router-dom";

import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import pencilImg from "../../assets/icons/pencil.png";
import * as S from "../../styles/Book";

const NewDiaryButton = () => {
  return (
    <Link to={PRIVATE_ROUTE.newDiary.path.split("/").reverse()[0]}>
      <S.ButtonContainer>
        <S.PencilIcon alt="write" src={pencilImg} />
        <S.ButtonDescription>일기 쓰기</S.ButtonDescription>
      </S.ButtonContainer>
    </Link>
  );
};

export default NewDiaryButton;
