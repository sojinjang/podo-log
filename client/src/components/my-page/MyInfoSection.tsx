import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { UserData } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import changeToKoreanDate from "src/utils/date";
import defaultProfileImg from "../../assets/icons/default_profile.png";
import * as G from "src/styles/Common";
import * as S from "../../styles/MyPage";

const MyInfoSection = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [profileImg, setProfileImg] = useState<string>("");

  const getUserData = async () => {
    try {
      const { data } = await api.get(API_URL.users);
      setUserData(data.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const onClickEditInfo = () => {
    navigate("edit", { state: { myInfo: userData } });
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setProfileImg(userData?.profile === "없음" ? defaultProfileImg : userData?.profile);
  }, [userData]);

  return (
    <>
      {userData && (
        <G.UnclickableContainer className="mt-[2vh] p-[2vh]">
          <div className="flex">
            <S.ProfileImg alt="profile" src={profileImg} />
            <S.InfoContainer>
              <S.InfoLine>
                <S.InfoTitle>닉네임</S.InfoTitle>
                <S.Info>{userData.nickname}</S.Info>
              </S.InfoLine>
              <S.InfoLine>
                <S.InfoTitle>가입 경로</S.InfoTitle>
                <S.Info>{userData.provider}</S.Info>
              </S.InfoLine>
              <S.InfoLine>
                <S.InfoTitle>가입일</S.InfoTitle>
                <S.Info>{changeToKoreanDate(userData.createdAt)}</S.Info>
              </S.InfoLine>
            </S.InfoContainer>
            <div className="inline-block">
              <S.Button onClick={onClickEditInfo}>정보 수정</S.Button>
            </div>
          </div>
        </G.UnclickableContainer>
      )}
    </>
  );
};

export default MyInfoSection;
