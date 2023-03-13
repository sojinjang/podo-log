import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import { deleteInfoAtom, getComments } from "src/recoil/diary-detail";
import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import PurpleButton from "../common/PurpleButton";

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
      <Background onClick={onClose} />
      <ModalSection>
        <Fade>
          <CloseButton type="button" onClick={onClose}>
            X
          </CloseButton>
          <Content>
            <ConfirmMsg>정말 삭제하시겠습니까?</ConfirmMsg>
            <GrapeImg src={require("../../assets/grape/grape_8.png")} />
            <WarningMsg>⚠️주의하세요!⚠️</WarningMsg>
            <DisadvantageDesc>
              삭제한 정보는 복구할 수 없으며
              <br />
              일기/댓글 삭제 시 리워드로 제공되었던
              <br />
              포도알이 반납될 수 있습니다.
            </DisadvantageDesc>
          </Content>
          <ButtonContainer onClick={onClickDelete}>
            <PurpleButton description="삭제하기" wrapperStyle="pb-[2vh]" />
          </ButtonContainer>
        </Fade>
      </ModalSection>
    </div>
  );
};

export default DeleteModal;

const Background = tw.div`
top-0 right-0 bottom-0 left-0 fixed bg-transparent 
`;

const ModalSection = tw.div`
fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/60 p-[1.5vh]
flex flex-col rounded-lg shadow-lg backdrop-blur text-center w-[31vh]
`;

const CloseButton = tw.button`
flex flex-end cursor-pointer ml-auto text-[2vh]
hover:opacity-50 ease-in duration-200
`;

const Content = tw.div`
flex flex-col my-[3vh] 
`;

const ConfirmMsg = tw.p`
font-sans font-bold text-[1.9vh] mx-auto
`;

const GrapeImg = tw.img`
w-[15vh] mx-auto
`;

const WarningMsg = tw.p`
font-sans text-[1.7vh] mx-auto
`;

const DisadvantageDesc = tw.p`
font-sans text-[1.4vh] mx-auto 
`;

const ButtonContainer = tw.div`
inline-block w-auto 
`;
