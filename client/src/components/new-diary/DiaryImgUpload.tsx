import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { diaryImgAtom } from "src/recoil/new-diary";

import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import {
  UploadedImg,
  TrashCanIcon,
  ImgUploadContainer,
  ImgUploadIcon,
} from "../diary/DairyImgUploadElem";

const DiaryImgUpload = () => {
  const reader = new FileReader();
  const imgRef = useRef<HTMLInputElement>(null);
  const [diaryImg, setDiaryImg] = useRecoilState(diaryImgAtom);
  const resetDiaryImg = useResetRecoilState(diaryImgAtom);
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>("");

  const saveImgFile = () => {
    if (imgRef?.current?.files) {
      const file = imgRef.current.files[0];
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
          <UploadedImg src={imgPreview ? imgPreview : imgUploadIcon}></UploadedImg>
          <TrashCanIcon onClick={() => deleteImgFile()} src={trashCanIcon} />
        </div>
      ) : (
        <ImgUploadContainer onClick={() => imgRef?.current?.click()}>
          <ImgUploadIcon src={imgUploadIcon} />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </ImgUploadContainer>
      )}
    </React.Fragment>
  );
};

export default DiaryImgUpload;
