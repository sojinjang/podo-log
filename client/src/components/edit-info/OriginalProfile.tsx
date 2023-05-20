import DefaultProfileImg from "src/assets/icons/default_profile.png";
import * as G from "src/styles/Common";

interface OriginalProfileProps {
  ogPicInfo: string;
  deleteImgFile: () => void;
}

const OriginalProfile = ({ ogPicInfo, deleteImgFile }: OriginalProfileProps) => {
  const hasNoOgPic = ogPicInfo === "없음";
  const originalPic = hasNoOgPic ? DefaultProfileImg : ogPicInfo;

  return (
    <>
      <G.ProfileImg src={originalPic} />
      {hasNoOgPic ? (
        <G.ProfileImgDescription htmlFor="profileImg">
          프로필 이미지 추가
        </G.ProfileImgDescription>
      ) : (
        <G.ProfileImgDescription onClick={deleteImgFile}>
          프로필 이미지 삭제
        </G.ProfileImgDescription>
      )}
    </>
  );
};

export default OriginalProfile;
