import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";

import DiaryRevisionImgUpload from "./DiaryRevisionImgUpload";
import { diaryRevisionImgAtom } from "src/recoil/diary-revision/atom";
import { Img } from "src/recoil/new-diary/atom";
import { API_URL } from "src/constants/API_URL";
import { postFormData, patch, get } from "src/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { accessTokenAtom } from "src/recoil/token";
import { DiaryForm, TitleInput, inputStyle, ContentInput } from "../diary/DiaryFormElem";
import { DiaryInput } from "../diary/DiaryInput";
import { convertURLtoFile } from "src/utils/image";

interface DiaryOgInput extends DiaryInput {
  picture: Blob | null;
}

const createDiaryForm = (diaryImg: Img) => {
  const formData = new FormData();
  if (diaryImg) formData.append("picture", diaryImg);

  return formData;
};

const DiaryRevisionForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = String(params.bookId);
  const diaryId = String(params.diaryId);
  const accessToken = useRecoilValue(accessTokenAtom);
  const diaryImg = useRecoilValue(diaryRevisionImgAtom);
  const [ogData, setOgData] = useState<DiaryOgInput | null>(null);
  const { register, handleSubmit } = useForm<DiaryInput>({
    mode: "onChange",
    defaultValues: async () => {
      const response = await get(API_URL.bookDiary(Number(bookId)), diaryId, accessToken);
      const { title, picture, content } = response.data;
      const pictureFile = picture === "없음" ? null : await convertURLtoFile(picture);
      setOgData({ title, picture: pictureFile, content });
      return { title, content };
    },
  });
  const onSubmitDiaryForm = async ({ title, content }: DiaryInput) => {
    const formData = createDiaryForm(diaryImg);
    try {
      await patch(API_URL.diary, diaryId, { title, content }, accessToken);
      if (ogData?.picture !== diaryImg && ogData?.picture !== null)
        await postFormData(API_URL.diaryImg(diaryId), formData, accessToken);
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
      {ogData && <DiaryRevisionImgUpload ogPicFile={ogData.picture} />}
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
