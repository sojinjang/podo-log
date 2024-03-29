import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";

import { DiaryInput } from "src/@types/input";
import DiaryImgUpload from "./DiaryImgUpload";
import { diaryImgAtom } from "src/recoil/new-diary/atom";
import { Img } from "src/recoil/new-diary/atom";
import { API_URL } from "src/constants/API_URL";
import { useNavigate, useParams } from "react-router-dom";
import { formApi } from "src/utils/axiosApi/formApi";
import * as S from "../../styles/Diary";

const createDiaryForm = (diaryImg: Img, bookId: string, { title, content }: DiaryInput) => {
  const formData = new FormData();
  if (diaryImg) formData.append("picture", diaryImg);
  formData.append("bookId", bookId);
  formData.append("title", title);
  formData.append("content", content);

  return formData;
};

const NewDiaryForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = String(params.bookId);
  const diaryImg = useRecoilValue(diaryImgAtom);
  const { register, handleSubmit } = useForm<DiaryInput>({ mode: "onSubmit" });

  const onSubmitDiaryForm = async ({ title, content }: DiaryInput) => {
    const formData = createDiaryForm(diaryImg, bookId, { title, content });
    try {
      await formApi.post(API_URL.diary, formData);
      navigate(-1);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <S.DiaryForm id="diary" onSubmit={handleSubmit(onSubmitDiaryForm)}>
      <S.TitleInput
        className={`${S.inputStyle}`}
        placeholder="제목을 입력해주세요."
        minLength={2}
        maxLength={30}
        required
        {...register("title")}
      />
      <DiaryImgUpload />
      <S.ContentInput
        className={`${S.inputStyle}`}
        placeholder="내용을 입력해주세요."
        minLength={2}
        maxLength={400}
        required
        {...register("content")}
      />
    </S.DiaryForm>
  );
};

export default NewDiaryForm;
