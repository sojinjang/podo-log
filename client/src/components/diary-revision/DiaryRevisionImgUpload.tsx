import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { diaryRevisionImgAtom } from "src/recoil/diary-revision/atom";
import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import {
  UploadedImg,
  TrashCanIcon,
  ImgUploadContainer,
  ImgUploadIcon,
} from "../diary/DairyImgUploadElem";

interface ImgRevisionProps {
  ogPicFile: Blob | null;
}
const DiaryRevisionImgUpload = ({ ogPicFile }: ImgRevisionProps) => {
  const reader = new FileReader();
  const imgRef = useRef<HTMLInputElement>(null);
  const [diaryImg, setDiaryImg] = useRecoilState(diaryRevisionImgAtom);
  const resetDiaryImg = useResetRecoilState(diaryRevisionImgAtom);
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
  const setOgPic = async () => {
    if (!ogPicFile) return;
    setDiaryImg(ogPicFile);
    reader.readAsDataURL(ogPicFile);
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
  };

  useEffect(() => {
    setOgPic;
  }, [ogPicFile]);

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

export default DiaryRevisionImgUpload;
