import React from "react";

import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";
import {
  UploadedImg,
  TrashCanIcon,
  ImgUploadContainer,
  ImgUploadIcon,
} from "../diary/DairyImgUploadElem";

interface ExistingImgProps {
  imgRef: React.RefObject<HTMLInputElement>;
  ogPicSrc: string;
  saveImgFile: () => void;
  handlePicChanged: () => void;
}
const ExistingImg = ({
  ogPicSrc,
  imgRef,
  saveImgFile,
  handlePicChanged,
}: ExistingImgProps) => {
  const ogPic = ogPicSrc === "없음" ? null : ogPicSrc;

  return (
    <>
      {ogPic ? (
        <div className="relative overflow-auto">
          {ogPic && <UploadedImg src={ogPic}></UploadedImg>}
          <TrashCanIcon
            onClick={() => {
              handlePicChanged();
            }}
            src={trashCanIcon}
          />
        </div>
      ) : (
        <ImgUploadContainer onClick={() => imgRef?.current?.click()}>
          <ImgUploadIcon src={imgUploadIcon} />
          <input
            className="hidden"
            type="file"
            accept="image/bmp,image/jpeg, image/jpg, image/png, image/heic, image/gif"
            onChange={() => {
              saveImgFile();
              handlePicChanged();
            }}
            ref={imgRef}
          />
        </ImgUploadContainer>
      )}
    </>
  );
};

export default ExistingImg;
