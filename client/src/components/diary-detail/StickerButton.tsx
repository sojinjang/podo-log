import stickerWebP from "../../assets/icons/sticker.webp";
import stickerPng from "../../assets/icons/sticker.png";
import * as S from "src/styles/DiaryDetail";

interface StickerButtonProps {
  changeEditState: () => void;
}

const StickerButton = ({ changeEditState }: StickerButtonProps) => {
  return (
    <div className="flex justify-end">
      <S.StckButtonContainer onClick={changeEditState}>
        <picture>
          <source srcSet={stickerWebP} type="image/webp" />
          <S.StickerIcon src={stickerPng} />
        </picture>
        <S.StckButtonDesc>스티커</S.StckButtonDesc>
      </S.StckButtonContainer>
    </div>
  );
};

export default StickerButton;
