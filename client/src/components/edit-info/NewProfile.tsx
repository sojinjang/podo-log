import DefaultProfileImg from "src/assets/icons/default_profile.png";
import * as G from "src/styles/Common";

interface NewProfileProps {
  profileImg: string | Blob;
  imgPreview: string | ArrayBuffer | null;
  deleteImgFile: () => void;
}

const NewProfile = ({ profileImg, imgPreview, deleteImgFile }: NewProfileProps) => {
  return (
    <>
      <G.ProfileImg src={profileImg ? imgPreview : DefaultProfileImg} />
      {profileImg && (
        <G.ProfileImgDescription onClick={deleteImgFile}>
          프로필 이미지 삭제
        </G.ProfileImgDescription>
      )}
      {!profileImg && (
        <G.ProfileImgDescription htmlFor="profileImg">
          프로필 이미지 추가
        </G.ProfileImgDescription>
      )}
    </>
  );
};

export default NewProfile;
