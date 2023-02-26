import React from "react";

import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import {
  UploadedImg,
  TrashCanIcon,
  ImgUploadContainer,
  ImgUploadIcon,
} from "../diary/DairyImgUploadElem";

interface NewImgProps {
  imgRef: React.RefObject<HTMLInputElement>;
  diaryImg: string | Blob;
  imgPreview: string | ArrayBuffer | null;
  deleteImgFile: () => void;
  saveImgFile: () => void;
}

const NewImg = ({ diaryImg, imgPreview, deleteImgFile, saveImgFile, imgRef }: NewImgProps) => {
  return (
    <>
      {diaryImg ? (
        <div className="relative overflow-auto">
          <UploadedImg src={imgPreview ? imgPreview : imgUploadIcon}></UploadedImg>
          <TrashCanIcon onClick={deleteImgFile} src={trashCanIcon} />
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
    </>
  );
};

export default NewImg;
