import { useRecoilValue, useSetRecoilState } from "recoil";
import Fade from "react-reveal/Fade";

import { deleteInfoAtom, getComments } from "src/recoil/diary-detail";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import PurpleButton from "../common/PurpleButton";
import grapeImgPng from "../../assets/icons/grape_8.png";
import grapeImgWebP from "../../assets/icons/grape_8.webp";
import * as S from "src/styles/DiaryDetail";

interface ModalProps {
  onClose: () => void;
}

const DeleteModal = ({ onClose }: ModalProps) => {
  const deleteInfo = useRecoilValue(deleteInfoAtom);
  const reloadComments = useSetRecoilState(getComments);

  const onClickDelete = async () => {
    const apiUrl = deleteInfo.target === "diary" ? API_URL.diary : API_URL.comments;
    try {
      await api.delete(apiUrl + `/${deleteInfo.id}`);
      if (deleteInfo.target === "diary") return window.history.back();
      reloadComments(1);
      onClose();
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <div className="relative z-20">
      <S.Background onClick={onClose} />
      <S.ModalSection>
        <Fade>
          <S.CloseButton type="button" onClick={onClose}>
            X
          </S.CloseButton>
          <S.Content>
            <S.ConfirmMsg>정말 삭제하시겠습니까?</S.ConfirmMsg>
            <picture>
              <source srcSet={grapeImgWebP} type="image/webp" />
              <S.GrapeImg alt="grape" src={grapeImgPng} />
            </picture>
            <S.WarningMsg>⚠️주의하세요!⚠️</S.WarningMsg>
            <S.DisadvantageDesc>
              삭제한 정보는 복구할 수 없으며
              <br />
              일기/댓글 삭제 시 리워드로 제공되었던
              <br />
              포도알이 반납될 수 있습니다.
            </S.DisadvantageDesc>
          </S.Content>
          <S.ButtonContainer onClick={onClickDelete}>
            <PurpleButton description="삭제하기" wrapperStyle="pb-[2vh]" />
          </S.ButtonContainer>
        </Fade>
      </S.ModalSection>
    </div>
  );
};

export default DeleteModal;
