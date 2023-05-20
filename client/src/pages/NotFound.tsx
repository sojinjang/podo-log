import { useNavigate } from "react-router-dom";

import { PinkPurpleBackground } from "src/styles/Common";
import BackButton from "src/components/common/BackButton";
import PurpleButton from "src/components/common/PurpleButton";
import Fade from "react-reveal/Fade";
import notFoundImg from "../assets/icons/404-error.png";
import * as S from "src/styles/NotFound";

const NotFound = () => {
  const navigate = useNavigate();
  const onClickHome = () => {
    navigate("/");
  };
  return (
    <PinkPurpleBackground className="flex">
      <BackButton />
      <Fade duration={1500}>
        <div className="mt-[15vh] mx-auto text-center">
          <S.PodoLog>PODO LOG</S.PodoLog>
          <S.NotFoundIcon alt="not found" src={notFoundImg} />
          <p className="text-[3vh]">페이지를 찾을 수 없습니다.</p>
          <p className="text-[1.7vh]">입력하신 주소가 정확한지 확인해주세요.</p>
          <S.ButtonContainer onClick={onClickHome}>
            <PurpleButton
              description="홈으로 가기"
              wrapperStyle="mt-[10vh]"
              buttonStyle="sm:w-40"
            />
          </S.ButtonContainer>
        </div>
      </Fade>
    </PinkPurpleBackground>
  );
};

export default NotFound;
