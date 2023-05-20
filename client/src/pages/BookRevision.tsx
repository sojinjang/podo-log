import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Bounce from "react-reveal/Bounce";

import { selectedColorAtom } from "src/recoil/book-color";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

import { BookNameInput } from "src/@types/input";
import { PinkPurpleBackground } from "src/styles/Common";
import { BackButton, PageTitle, PurpleButton } from "src/components/common";
import {
  ContainerTitle,
  BookIcon,
  ColorSelectContainer,
  BookTitleInputContainer,
} from "src/components/common/book";

const BookRevision = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const bookId = params.bookId;
  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorAtom);
  const [isTitleRevised, setIsTitleRevised] = useState(false);
  const [isRevised, setIsRevised] = useState(false);
  const [buttonCursorStyle, setButtonCursorStyle] = useState("");
  const { register, handleSubmit } = useForm<BookNameInput>({
    defaultValues: { bookName: location.state.name },
  });
  const refreshIsTitleRevised = (currentTitle: string) => {
    setIsTitleRevised(currentTitle !== location.state.name);
  };
  const reviseBookInfo = async ({ bookName }: BookNameInput) => {
    try {
      if (!isRevised) return;
      await api.patch(API_URL.books + `/${bookId}`, { color: selectedColor, bookName });
      navigate(PRIVATE_ROUTE.books.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  useEffect(() => {
    setSelectedColor(location.state.color);
  }, []);

  useEffect(() => {
    setIsRevised(selectedColor !== location.state.color || isTitleRevised);
  }, [selectedColor, isTitleRevised]);

  useEffect(() => {
    setButtonCursorStyle(isRevised ? "" : "cursor-not-allowed");
  }, [isRevised]);

  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 수정" />
      <Bounce duration={1500}>
        <form onSubmit={handleSubmit(reviseBookInfo)}>
          <BookIcon />
          <ContainerTitle>표지 색상 선택</ContainerTitle>
          <ColorSelectContainer />
          <ContainerTitle>일기장 제목</ContainerTitle>
          <BookTitleInputContainer
            register={register("bookName")}
            existingNameLen={location.state.name.length}
            refreshIsTitleRevised={refreshIsTitleRevised}
          />
          <PurpleButton
            description="수정하기"
            wrapperStyle="mt-[5vh]"
            buttonStyle={`sm:w-40 ${buttonCursorStyle}`}
          />
        </form>
      </Bounce>
    </PinkPurpleBackground>
  );
};

export default BookRevision;
