import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { diaryRevisionImgAtom } from "src/recoil/diary-revision/atom";
import { compressImg } from "src/utils/compressImg";
import { convertHEICToJPG, isHEICFile } from "src/utils/handleHEIC";
import ExistingImg from "./ExistingImg";
import NewImg from "./NewImg";

export interface ImgRevisionProps {
  ogPicSrc: string;
  isPicChanged: boolean;
  handlePicChanged: () => void;
}

const DiaryRevisionImgUpload = ({
  ogPicSrc,
  isPicChanged,
  handlePicChanged,
}: ImgRevisionProps) => {
  const reader = new FileReader();
  const imgRef = useRef<HTMLInputElement>(null);
  const [diaryImg, setDiaryImg] = useRecoilState(diaryRevisionImgAtom);
  const resetDiaryImg = useResetRecoilState(diaryRevisionImgAtom);
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
    <>
      {isPicChanged ? (
        <NewImg
          imgRef={imgRef}
          diaryImg={diaryImg}
          imgPreview={imgPreview}
          deleteImgFile={deleteImgFile}
          saveImgFile={saveImgFile}
        />
      ) : (
        <ExistingImg
          imgRef={imgRef}
          ogPicSrc={ogPicSrc}
          saveImgFile={saveImgFile}
          handlePicChanged={handlePicChanged}
        />
      )}
    </>
  );
};

export default DiaryRevisionImgUpload;
