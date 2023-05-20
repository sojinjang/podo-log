import { useState, useEffect, useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { profileImgAtom } from "src/recoil/sign-up";
import { compressImg } from "src/utils/compressImg";
import { isHEICFile, convertHEICToJPG } from "src/utils/handleHEIC";
import DefaultProfileImg from "src/assets/icons/default_profile.png";
import * as G from "src/styles/Common";

export const ProfileImgUpload = () => {
  const [profileImg, setProfileImg] = useRecoilState(profileImgAtom);
  const resetProfileImg = useResetRecoilState(profileImgAtom);
  const [imgPreview, setImgPreview] = useState<string | ArrayBuffer | null>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const reader = new FileReader();

  const saveImgFile = async () => {
    if (imgRef?.current?.files) {
      let file = imgRef.current.files[0];
      if (isHEICFile(file)) file = await convertHEICToJPG(file);
      const compressedImg = await compressImg(file);
      if (compressedImg) file = compressedImg;
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
      <G.ProfileImg alt="profile" src={profileImg ? imgPreview : DefaultProfileImg} />
      {!profileImg && (
        <G.ProfileImgDescription htmlFor="profileImg">
          프로필 이미지 추가
        </G.ProfileImgDescription>
      )}
      {profileImg && (
        <G.ProfileImgDescription onClick={deleteImgFile}>
          프로필 이미지 삭제
        </G.ProfileImgDescription>
      )}
      <input
        className="hidden"
        type="file"
        accept="image/bmp,image/jpeg, image/jpg, image/png, image/heic"
        onChange={saveImgFile}
        ref={imgRef}
      />
    </div>
  );
};
