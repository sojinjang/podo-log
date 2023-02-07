import React from "react";
import tw from "tailwind-styled-components";
import { CommentType } from "./CommentSection";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import changeToKoreanTime from "src/utils/time";

interface CommentProps {
  data: CommentType;
  isReply?: boolean;
  changeReplyState?: () => void;
}

export const Comment = ({ data, isReply = false, changeReplyState }: CommentProps) => {
  const WIDTH = isReply ? "w-[95%]" : "";
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const isRevised = data.createdAt !== data.updatedAt;

  return (
    <SingleCommentContainer className={WIDTH}>
      <div className="flex">
        <CommentWriterImg src={profileImgSrc}></CommentWriterImg>
        <div className="my-auto">
          <CommentWriter>{data.nickname}</CommentWriter>
          <div className="flex">
            <CommentDate>{changeToKoreanTime(data.updatedAt)}</CommentDate>
            {isRevised && <CommentDate className="ml-1">(수정됨)</CommentDate>}
          </div>
        </div>
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
