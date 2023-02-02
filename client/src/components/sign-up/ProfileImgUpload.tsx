import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState, useResetRecoilState } from "recoil";

import { profileImgAtom } from "src/recoil/sign-up";
import DefaultProfileImg from "../../assets/icons/default_profile.png";

export const ProfileImgUpload = () => {
  const [profileImg, setProfileImg] = useRecoilState(profileImgAtom);
  const resetProfileImg = useResetRecoilState(profileImgAtom);
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const reader = new FileReader();

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
    if (typeof profileImg === "string") URL.revokeObjectURL(profileImg);
    setProfileImg("");
  };

  useEffect(() => {
    return () => {
      resetProfileImg();
    };
  }, []);

  return (
    <div className="m-auto text-center">
      <ProfileImg src={profileImg ? imgPreview : DefaultProfileImg} />
      {!profileImg && (
        <ProfileImgDescription htmlFor="profileImg">프로필 이미지 추가</ProfileImgDescription>
      )}
      {profileImg && (
        <ProfileImgDescription onClick={() => deleteImgFile()}>
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
    </div>
  );
};

const ProfileImg = tw.img`
w-[130px] h-[130px] object-cover shadow-lg mx-auto my-2 rounded-full bg-white
`;

const ProfileImgDescription = tw.label`
cursor-pointer text-purple-1000 
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;
