import React from "react";

import DefaultProfileImg from "src/assets/icons/default_profile.png";
import { ProfileImg, ProfileImgDescription } from "src/components/common/Profile";

interface OriginalProfileProps {
  ogPicInfo: string;
  deleteImgFile: () => void;
}

const OriginalProfile = ({ ogPicInfo, deleteImgFile }: OriginalProfileProps) => {
  const hasNoOgPic = ogPicInfo === "없음";
  const originalPic = hasNoOgPic ? DefaultProfileImg : ogPicInfo;

  return (
    <>
      <ProfileImg src={originalPic} />
      {hasNoOgPic ? (
        <ProfileImgDescription htmlFor="profileImg">프로필 이미지 추가</ProfileImgDescription>
      ) : (
        <ProfileImgDescription onClick={deleteImgFile}>
          프로필 이미지 삭제
        </ProfileImgDescription>
      )}
    </>
  );
};

export default OriginalProfile;
