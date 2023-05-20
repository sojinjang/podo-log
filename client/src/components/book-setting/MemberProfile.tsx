import defaultProfileImg from "../../assets/icons/default_profile.png";
import { MemberInfo } from "src/@types/response";
import * as S from "../../styles/BookSetting";

const MemberProfile = ({ profile, nickname, isMe }: Omit<MemberInfo, "userId">) => {
  const profileImg = profile === "없음" ? defaultProfileImg : profile;
  return (
    <S.ProfileContainer>
      {/* TODO: common의 ProfileImg로 대체      */}
      <S.ProfileImg alt="profile" src={profileImg}></S.ProfileImg>
      <S.Nickname>{nickname}</S.Nickname>
      {isMe && <S.Nickname>(me!)</S.Nickname>}
    </S.ProfileContainer>
  );
};

export default MemberProfile;
