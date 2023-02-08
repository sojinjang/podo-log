import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import changeToKoreanTime from "src/utils/time";
import { accessTokenAtom } from "src/recoil/token";

import { CommentType } from "./CommentSection";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import MenuImg from "../../assets/icons/menu.png";
import DropdownImg from "../../assets/icons/dropdown_menu.png";
import { getUserId } from "../../utils/getUserId";

interface CommentProps {
  data: CommentType;
  isReply?: boolean;
  changeReplyState?: () => void;
}

export const Comment = ({ data, isReply = false, changeReplyState }: CommentProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const isCommentWriter = getUserId(accessToken) === data.userId;
  const [isDropdownActivatied, setIsDropdownActivatied] = useState<boolean>(false);
  const changeDropdownState = () => {
    setIsDropdownActivatied((prev) => !prev);
  };
  const commentWidth = isReply ? "w-[95%]" : "";
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const isRevised = data.createdAt !== data.updatedAt;
  const dropdownMenuImgSrc = isDropdownActivatied ? DropdownImg : MenuImg;

  return (
    <SingleCommentContainer className={commentWidth}>
      <div className="flex">
        <CommentWriterImg src={profileImgSrc} />
        <div className="my-auto">
          <CommentWriter>{data.nickname}</CommentWriter>
          <div className="flex">
            <CommentDate>{changeToKoreanTime(data.updatedAt)}</CommentDate>
            {isRevised && <CommentDate className="ml-1">(수정됨)</CommentDate>}
          </div>
        </div>
        {isCommentWriter && (
          <DropdownMenuIcon onClick={changeDropdownState} src={dropdownMenuImgSrc} />
        )}
      </div>
      <div className="flex mt-1 md:mt-2">
        <CommentContent>{data.reply}</CommentContent>
        {!isReply && (
          <CommentReplyIcon
            onClick={changeReplyState}
            src={require("../../assets/icons/reply.png")}
          />
        )}
      </div>
    </SingleCommentContainer>
  );
};

export const CommentReply = ({ data }: CommentProps) => {
  return (
    <div className="flex justify-end">
      <Comment data={data} isReply={true}></Comment>
    </div>
  );
};

const SingleCommentContainer = tw.div`
mb-2 md:mb-3
`;

const CommentWriterImg = tw.img`
w-[30px] h-[30px] min-[390px]:w-[38px] min-[390px]:h-[38px] md:w-[48px] md:h-[48px] 
rounded-full object-cover shadow-lg mr-2 md:mr-3
`;

const CommentWriter = tw.p`
text-[1.6vh] min-[390px]:text-[1.4vh]
`;

const CommentDate = tw.p`
text-gray-1000 text-[0.5vh] min-[390px]:text-[0.9vh]  md:text-[1vh]
`;

const CommentContent = tw.p`
text-[1.6vh] min-[390px]:text-[1.4vh] 
whitespace-pre-line break-all
`;

const CommentReplyIcon = tw.img`
h-[1.6vh] min-[390px]:h-[1.4vh] ml-auto ml-2 my-auto cursor-pointer
hover:opacity-50 ease-in duration-300
`;

const DropdownMenuIcon = tw.img`
w-[15px] h-[15px] min-[390px]:w-[19px] min-[390px]:h-[19px] md:w-[24px] md:h-[24px] 
ml-auto cursor-pointer hover:opacity-50 ease-in duration-300
`;
