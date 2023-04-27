import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

import changeToKoreanTime from "src/utils/time";
import { accessTokenAtom } from "src/recoil/token";

import { CommentType } from "./CommentSection";
import { getUserId } from "../../utils/getUserId";
import { DropdownMenu } from "./DropdownMenu";
import { EditComment } from "./EditComment";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import replyImg from "../../assets/icons/reply.png";

interface CommentProps {
  data: CommentType;
  parentNickname?: string;
  isReply?: boolean;
  changeReplyState?: () => void;
}

export const Comment = ({
  data,
  parentNickname,
  isReply = false,
  changeReplyState,
}: CommentProps) => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const isCommentWriter = getUserId(accessToken) === data.userId;
  const commentWidth = isReply ? "w-[95%]" : "";
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const isRevised = data.createdAt !== data.updatedAt;

  return (
    <SingleCommentContainer className={commentWidth}>
      {!isBeingEdited && (
        <>
          <CommentUpperSection>
            <CommentWriterImg alt="profile" src={profileImgSrc} />
            <div className="my-auto">
              <CommentWriter>{data.nickname}</CommentWriter>
              <div className="flex">
                <CommentDate>{changeToKoreanTime(data.updatedAt)}</CommentDate>
                {isRevised && <CommentDate className="ml-1">(수정됨)</CommentDate>}
              </div>
            </div>
            {isCommentWriter && (
              <DropdownMenu
                deleteInfo={{ id: data.commentId, target: "comment" }}
                setCommentIsBeingEdited={setIsBeingEdited}
              />
            )}
          </CommentUpperSection>
          <CommentLowerSection>
            <CommentContent>{data.reply}</CommentContent>
            {!isReply && (
              <CommentReplyIcon alt="reply" onClick={changeReplyState} src={replyImg} />
            )}
          </CommentLowerSection>
        </>
      )}
      {isBeingEdited && (
        <EditComment
          commentId={data.commentId}
          comment={data.reply}
          parentNickname={parentNickname}
          cancelEdit={() => {
            setIsBeingEdited(false);
          }}
        ></EditComment>
      )}
    </SingleCommentContainer>
  );
};

export const CommentReply = ({ data, parentNickname }: CommentProps) => {
  return (
    <div className="flex justify-end">
      <Comment data={data} parentNickname={parentNickname} isReply={true}></Comment>
    </div>
  );
};

const SingleCommentContainer = tw.div`
mb-2 md:mb-3
`;

export const CommentUpperSection = tw.div`
flex
`;

export const CommentLowerSection = tw.div`
flex mt-1 md:mt-2
`;

const CommentWriterImg = tw.img`
w-[30px] h-[30px] min-[390px]:w-[38px] min-[390px]:h-[38px] md:w-[48px] md:h-[48px] 
rounded-full object-cover shadow-lg my-auto mr-2 md:mr-3
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
h-[1.6vh] min-[390px]:h-[1.4vh] ml-2 my-auto cursor-pointer
hover:opacity-50 ease-in duration-300
`;
