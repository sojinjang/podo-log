import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { diaryImgAtom } from "src/recoil/new-diary";
import { compressImg } from "src/utils/compressImg";
import { convertHEICToJPG, isHEICFile } from "src/utils/handleHEIC";
import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import * as S from "../../styles/Diary";

const DiaryImgUpload = () => {
  const reader = new FileReader();
  const imgRef = useRef<HTMLInputElement>(null);
  const [diaryImg, setDiaryImg] = useRecoilState(diaryImgAtom);
  const resetDiaryImg = useResetRecoilState(diaryImgAtom);
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>("");

  const saveImgFile = async () => {
    if (imgRef?.current?.files) {
      let file = imgRef.current.files[0];
      if (isHEICFile(file)) file = await convertHEICToJPG(file);
      const compressedImg = await compressImg(file);
      if (compressedImg) file = compressedImg;
      setDiaryImg(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
    }
  };

  const deleteImgFile = () => {
    if (typeof diaryImg === "string") URL.revokeObjectURL(diaryImg);
    setDiaryImg("");
  };

  useEffect(() => {
    return () => {
      resetDiaryImg();
    };
  }, []);

  return (
    <React.Fragment>
      {diaryImg ? (
        <div className="relative overflow-auto">
          <S.UploadedImg src={imgPreview ? imgPreview : imgUploadIcon}></S.UploadedImg>
          <S.TrashCanIcon onClick={() => deleteImgFile()} src={trashCanIcon} />
        </div>
      ) : (
        <S.ImgUploadContainer onClick={() => imgRef?.current?.click()}>
          <S.ImgUploadIcon alt="upload" src={imgUploadIcon} />
          <input
            className="hidden"
            type="file"
            accept="image/bmp,image/jpeg, image/jpg, image/png, image/heic, image/gif"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </S.ImgUploadContainer>
      )}
    </React.Fragment>
  );
};

export default DiaryImgUpload;
