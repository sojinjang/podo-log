import React from "react";

import DefaultProfileImg from "src/assets/icons/default_profile.png";
import { ProfileImg, ProfileImgDescription } from "src/components/common/Profile";

interface NewProfileProps {
  profileImg: string | Blob;
  imgPreview: string | ArrayBuffer | null;
  deleteImgFile: () => void;
}

const NewProfile = ({ profileImg, imgPreview, deleteImgFile }: NewProfileProps) => {
  return (
    <>
      <ProfileImg src={profileImg ? imgPreview : DefaultProfileImg} />
      {profileImg && (
        <ProfileImgDescription onClick={deleteImgFile}>
          프로필 이미지 삭제
        </ProfileImgDescription>
      )}
      {!profileImg && (
        <ProfileImgDescription htmlFor="profileImg">프로필 이미지 추가</ProfileImgDescription>
      )}
    </>
  );
};

export default NewProfile;
