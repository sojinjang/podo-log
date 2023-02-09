import React from "react";
import tw from "tailwind-styled-components";
import Fade from "react-reveal/Fade";

import PurpleButton from "../common/PurpleButton";

interface ModalProps {
  onClose: () => void;
}

const DeleteModal = ({ onClose }: ModalProps) => {
  return (
    <>
      <Background onClick={onClose} />
      <ModalSection>
        <Fade>
          <CloseButton type="button" onClick={onClose}>
            X
          </CloseButton>
          <Content>
            <ConfirmMsg>정말 삭제하시겠습니까?</ConfirmMsg>
            <GrapeImg src={require("../../assets/grape/grape_8.png")}></GrapeImg>
            <WarningMsg>⚠️주의하세요!⚠️</WarningMsg>
            <DisadvantageDesc>
              삭제한 정보는 복구할 수 없으며
              <br />
              일기/댓글 삭제 시 리워드로 제공되었던
              <br />
              포도알이 반납될 수 있습니다.
            </DisadvantageDesc>
          </Content>
          <PurpleButton description="삭제하기" wrapperStyle="pb-[2vh]" />
        </Fade>
      </ModalSection>
    </>
  );
};

export default DeleteModal;

const Background = tw.div`
top-0 right-0 bottom-0 left-0 fixed bg-transparent 
`;

const ModalSection = tw.div`
fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white/60 p-[1.5vh]
flex flex-col rounded-lg shadow-lg backdrop-blur
`;

const CloseButton = tw.button`
flex flex-end cursor-pointer ml-auto
text-[14px] min-[390px]:text-[1.6vh]
`;

const Content = tw.div`
flex flex-col mx-[2.5vh] min-[390px]:mx-[3.5vh] my-[3vh]
`;

const ConfirmMsg = tw.p`
font-[notosans] font-bold text-[14px] min-[390px]:text-[1.6vh] mx-auto
`;

const GrapeImg = tw.img`
w-[15vh] mx-auto
`;

const WarningMsg = tw.p`
font-[notosans] text-[13px] min-[390px]:text-[1.3vh] mx-auto
`;

const DisadvantageDesc = tw.p`
font-[notosans] text-[10px] min-[390px]:text-[1.1vh] text-center mx-auto 
`;
