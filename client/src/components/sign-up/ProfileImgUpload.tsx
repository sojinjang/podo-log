import React, { useRef } from "react";
import tw from "tailwind-styled-components";
import { useRecoilState } from "recoil";

import { profileImgAtom } from "src/recoil/sign-up";
import DefaultProfileImg from "../../assets/icons/default_profile.png";

export const ProfileImgUpload = () => {
  const [imgFile, setImgFile] = useRecoilState(profileImgAtom);
  const imgRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    if (imgRef?.current?.files) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
    }
  };

  const deleteImgFile = () => {
    if (typeof imgFile === "string") URL.revokeObjectURL(imgFile);
    setImgFile("");
  };

  return (
    <div className="m-auto text-center">
      <ProfileImg src={imgFile ? imgFile : DefaultProfileImg} />
      {!imgFile && (
        <ProfileImgDescription htmlFor="profileImg">프로필 이미지 추가</ProfileImgDescription>
      )}
      {imgFile && (
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
w-[130px] h-[130px] object-cover shadow-lg mx-auto my-2 rounded-full
`;

const ProfileImgDescription = tw.label`
cursor-pointer text-purple-1000 
drop-shadow-lg hover:drop-shadow-none transition duration-300 ease-in-out
`;
