import React, { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Bounce from "react-reveal/Bounce";

import { patch } from "src/utils/api";
import { accessTokenAtom } from "src/recoil/token";
import { selectedColorAtom } from "../recoil/book-color";
import { API_URL } from "src/constants/API_URL";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import PurpleButton from "src/components/common/PurpleButton";
import DiaryIcon from "src/components/new-book/DiaryIcon";
import ColorSelectContainer from "src/components/new-book/ColorSelectContainer";
import ContainerTitle from "src/components/new-book/ContainerTitle";
import BookTitleInputContainer from "src/components/new-book/BookTitleInputContainer";

interface BookNameType {
  bookName: string;
}

const BookRevision = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const bookId = params.bookId;
  const accessToken = useRecoilValue(accessTokenAtom);
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorAtom);
  const { register, handleSubmit } = useForm<BookNameType>({
    mode: "onChange",
  });

  useEffect(() => {
    setSelectedColor(location.state.color);
  }, []);

  const reviseBookInfo = async ({ bookName }: BookNameType) => {
    try {
      await patch(API_URL.books, bookId, { color: selectedColor, bookName }, accessToken);
      navigate(-1);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 수정" />
      <Bounce duration={1500}>
        <form onSubmit={handleSubmit(reviseBookInfo)}>
          <DiaryIcon />
          <ContainerTitle>표지 색상 선택</ContainerTitle>
          <ColorSelectContainer />
          <ContainerTitle>일기장 제목</ContainerTitle>
          <BookTitleInputContainer register={register("bookName")} />
          <PurpleButton description="수정하기" wrapperStyle="mt-[5vh]" buttonStyle="sm:w-40" />
        </form>
      </Bounce>
    </PinkPurpleBackground>
  );
};

export default BookRevision;
