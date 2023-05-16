import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";

import { DiaryInput, DiaryOgInput } from "src/@types/input";
import DiaryRevisionImgUpload from "./DiaryRevisionImgUpload";
import { diaryRevisionImgAtom } from "src/recoil/diary-revision/atom";
import { Img } from "src/recoil/new-diary/atom";
import { API_URL } from "src/constants/API_URL";
import { api } from "src/utils/axiosApi/api";
import { formApi } from "src/utils/axiosApi/formApi";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryForm, TitleInput, inputStyle, ContentInput } from "../diary/DiaryFormElem";

const createFormData = (diaryImg: Img) => {
  const formData = new FormData();
  formData.append("picture", diaryImg);

  return formData;
};

const DiaryRevisionForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = String(params.bookId);
  const diaryId = String(params.diaryId);
  const diaryImg = useRecoilValue(diaryRevisionImgAtom);
  const [isPicChanged, setIsPicChanged] = useState(false);
  const [ogData, setOgData] = useState<DiaryOgInput | null>(null);
  const { register, handleSubmit } = useForm<DiaryInput>({
    defaultValues: async () => {
      const { data } = await api.get(API_URL.bookDiary(Number(bookId)) + `/${diaryId}`);
      const { title, picture, content } = data.data;
      setOgData({ title, picture: picture, content });
      return { title, content };
    },
  });

  const onSubmitPicture = async () => {
    if (diaryImg === "") return await api.delete(API_URL.diaryImg(diaryId));
    await formApi.post(API_URL.diaryImg(diaryId), createFormData(diaryImg));
  };
  const onSubmitDiaryForm = async ({ title, content }: DiaryInput) => {
    try {
      await api.patch(API_URL.diary + `/${diaryId}`, { title, content });
      if (isPicChanged) await onSubmitPicture();
      navigate(-2);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <DiaryForm id="diary" onSubmit={handleSubmit(onSubmitDiaryForm)}>
      <TitleInput
        className={`${inputStyle}`}
        placeholder="제목을 입력해주세요."
        minLength={2}
        maxLength={30}
        required
        {...register("title")}
      />
      {ogData && (
        <DiaryRevisionImgUpload
          ogPicSrc={ogData.picture}
          isPicChanged={isPicChanged}
          handlePicChanged={() => {
            setIsPicChanged(true);
          }}
        />
      )}
      <ContentInput
        className={`${inputStyle}`}
        placeholder="내용을 입력해주세요."
        minLength={2}
        maxLength={400}
        required
        {...register("content")}
      />
    </DiaryForm>
  );
};

export default DiaryRevisionForm;
