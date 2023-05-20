import { Link } from "react-router-dom";

import { API_URL } from "src/constants/API_URL";
import naverLogo from "../../assets/icons/sns/naver.png";
import kakaoLogo from "../../assets/icons/sns/kakao.png";
import * as S from "src/styles/Home";

interface SNSContainerProps {
  sectionTitle: string;
}

const SNSLoginContainer = ({ sectionTitle }: SNSContainerProps) => {
  return (
    <div className="mx-auto mt-5 w-[65%]">
      <S.Divider />
      <S.SectionDescription>{sectionTitle}</S.SectionDescription>
      <S.IconContainer>
        <S.SNSLoginButtonBg className="bg-[#03C75A]">
          <Link to={process.env.REACT_APP_SERVER_URL + API_URL.naverLogin}>
            <img className="w-[5vh] h-[5vh]" alt="naver" src={naverLogo} />
          </Link>
        </S.SNSLoginButtonBg>
        <S.SNSLoginButtonBg className="bg-[#FEE500]">
          <Link to={process.env.REACT_APP_SERVER_URL + API_URL.kakaoLogin}>
            <img className="w-[5vh] h-[5vh]" alt="kakao" src={kakaoLogo} />
          </Link>
        </S.SNSLoginButtonBg>
      </S.IconContainer>
    </div>
  );
};

export default SNSLoginContainer;
