import React, { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "src/utils/axiosApi/api";
import { formApi } from "src/utils/axiosApi/formApi";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { API_URL } from "src/constants/API_URL";

import PurpleButton from "src/components/common/PurpleButton";
import NewProfile from "./NewProfile";
import OriginalProfile from "./OriginalProfile";

const EditProfile = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const reader = new FileReader();
  const [profileImg, setProfileImg] = useState<string | Blob>("");
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>(null);
  const [isPicChanged, setIsPicChanged] = useState(false);

  const saveImgFile = () => {
    if (!isPicChanged) setIsPicChanged(true);
    if (imgRef?.current?.files) {
      const file = imgRef.current.files[0];
      if (!file) return;
      setProfileImg(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
    }
  };
  const deleteOgPic = () => {
    setIsPicChanged(true);
  };
  const deleteImgFile = () => {
    if (typeof profileImg === "string") URL.revokeObjectURL(profileImg);
    setProfileImg("");
  };
  const createFormData = () => {
    const formData = new FormData();
    formData.append("profile", profileImg);
    return formData;
  };
  const onClickEdit = async () => {
    if (!isPicChanged) return;
    const isPicDeleted = profileImg === "";
    try {
      if (isPicDeleted) await api.delete(API_URL.profile);
      else await formApi.post(API_URL.profile, createFormData());
      navigate(PRIVATE_ROUTE.myPage.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="m-auto flex flex-col text-center">
      {isPicChanged ? (
        <NewProfile
          profileImg={profileImg}
          imgPreview={imgPreview}
          deleteImgFile={deleteImgFile}
        />
      ) : (
        <OriginalProfile
          ogPicInfo={location.state.myInfo.profile}
          deleteImgFile={deleteOgPic}
        />
      )}
      <input
        className="hidden"
        type="file"
        accept="image/*"
        id="profileImg"
        onChange={saveImgFile}
        ref={imgRef}
      />
      <ButtonContainer onClick={onClickEdit}>
        <PurpleButton
          description="이미지 수정하기"
          wrapperStyle="w-full"
          buttonStyle="w-[65%]"
        />
      </ButtonContainer>
    </div>
  );
};

export default EditProfile;

const ButtonContainer = tw.div`
inline-block w-auto mt-[1vh] mb-[1.5vh]
`;
