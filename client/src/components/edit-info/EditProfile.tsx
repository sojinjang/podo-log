import React, { useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import { accessTokenAtom } from "src/recoil/token";
import { postFormData, del } from "src/utils/api";
import DefaultProfileImg from "src/assets/icons/default_profile.png";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { API_URL } from "src/constants/API_URL";

import PurpleButton from "src/components/common/PurpleButton";

const EditProfile = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const reader = new FileReader();
  const [profileImg, setProfileImg] = useState<string | Blob>("");
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>(null);
  const [isPicChanged, setIsPicChanged] = useState(false);

  const saveImgFile = () => {
    if (imgRef?.current?.files) {
      const file = imgRef.current.files[0];
      setProfileImg(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
    }
  };
  const deleteImgFile = () => {
    if (!isPicChanged) return setIsPicChanged(true);
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
    try {
      await postFormData(API_URL.profile, createFormData(), accessToken);
      navigate(PRIVATE_ROUTE.myPage.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="m-auto flex flex-col text-center">
      {isPicChanged ? (
        <ProfileImg src={profileImg && profileImg ? imgPreview : DefaultProfileImg} />
      ) : (
        <ProfileImg src={location.state.myInfo.profile} />
      )}
      {!profileImg && isPicChanged && (
        <ProfileImgDescription htmlFor="profileImg">프로필 이미지 추가</ProfileImgDescription>
      )}
      {(profileImg || !isPicChanged) && (
        <ProfileImgDescription onClick={deleteImgFile}>
          프로필 이미지 삭제
        </ProfileImgDescription>
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

const ProfileImg = tw.img`
w-[10vh] h-[10vh] object-cover shadow-lg mx-auto my-2 rounded-full bg-white
`;

const ProfileImgDescription = tw.label`
cursor-pointer text-purple-1000 text-[1.4vh]
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;

const ButtonContainer = tw.div`
inline-block w-auto mt-[1vh] mb-[1.5vh]
`;
