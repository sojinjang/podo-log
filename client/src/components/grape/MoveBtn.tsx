import moveDownImg from "../../assets/icons/move_down.png";
import moveUpImg from "../../assets/icons/move_up.png";
import * as S from "../../styles/Grape";

interface MoveBtnProps {
  isMoveDown: boolean;
  grapeRef?: React.RefObject<HTMLDivElement>;
  stickerShopRef?: React.RefObject<HTMLDivElement>;
}

const MoveBtn = ({ isMoveDown, grapeRef, stickerShopRef }: MoveBtnProps) => {
  const btnImg = isMoveDown ? moveDownImg : moveUpImg;
  const btnDesc = isMoveDown ? "스티커로 교환" : "내 포도알";

  const moveToAnotherSection = () => {
    if (isMoveDown) return stickerShopRef?.current?.scrollIntoView({ behavior: "smooth" });
    grapeRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <S.ContainerWrapper>
      <S.BtnContainer onClick={moveToAnotherSection}>
        <S.BtnIcon src={btnImg} />
        <S.BtnDesc>{btnDesc}</S.BtnDesc>
      </S.BtnContainer>
    </S.ContainerWrapper>
  );
};

export default MoveBtn;
