import { MyGrape } from "src/@types/response";
import grapeImg from "../../assets/icons/colored_grape_353866.png";
import * as S from "../../styles/Grape";

const MyGrapeNum = ({ grape }: Pick<MyGrape, "grape">) => {
  return (
    <S.GrapeNumContainer>
      <S.GrapeIcon alt="grape" src={grapeImg} />
      <S.GrapeNumDesc>{grape}송이</S.GrapeNumDesc>
    </S.GrapeNumContainer>
  );
};

export default MyGrapeNum;
