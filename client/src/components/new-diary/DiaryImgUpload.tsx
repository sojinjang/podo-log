import React, { useRef, useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { diaryImgAtom } from "src/recoil/new-diary";
import tw from "tailwind-styled-components";

import imgUploadIcon from "../../assets/icons/image.png";
import trashCanIcon from "../../assets/icons/trash-can-white.png";

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

const UploadedImg = tw.img`
max-w-[80%] mx-auto
`;

const ImgUploadContainer = tw.div`
flex bg-[#F0F0F0] w-[65%] h-[35%] mx-auto rounded-xl cursor-pointer
hover:opacity-70 transition duration-500 ease-in-out
`;

const ImgUploadIcon = tw.img`
w-[15%] m-auto
`;

const TrashCanIcon = tw.img`
w-[5%] absolute right-[12%] top-[1vh] cursor-pointer
drop-shadow-2xl hover:drop-shadow-none transition ease-in duration-300
`;
