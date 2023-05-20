import { useState } from "react";
import { useRecoilValue } from "recoil";

import changeToKoreanTime from "src/utils/time";
import { accessTokenAtom } from "src/recoil/token";

import { CommentType } from "src/@types/response";
import { getUserId } from "../../utils/getUserId";
import { DropdownMenu } from "./DropdownMenu";
import { EditComment } from "./EditComment";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import replyImg from "../../assets/icons/reply.png";
import * as S from "src/styles/DiaryDetail";

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
    <S.SingleCommentContainer className={commentWidth}>
      {!isBeingEdited && (
        <>
          <S.CommentUpperSection>
            <S.CommentWriterImg alt="profile" src={profileImgSrc} />
            <div className="my-auto">
              <S.CommentWriter>{data.nickname}</S.CommentWriter>
              <div className="flex">
                <S.CommentDate>{changeToKoreanTime(data.updatedAt)}</S.CommentDate>
                {isRevised && <S.CommentDate className="ml-1">(수정됨)</S.CommentDate>}
              </div>
            </div>
            {isCommentWriter && (
              <DropdownMenu
                deleteInfo={{ id: data.commentId, target: "comment" }}
                setCommentIsBeingEdited={setIsBeingEdited}
              />
            )}
          </S.CommentUpperSection>
          <S.CommentLowerSection>
            <S.CommentContent>{data.reply}</S.CommentContent>
            {!isReply && (
              <S.CommentReplyIcon alt="reply" onClick={changeReplyState} src={replyImg} />
            )}
          </S.CommentLowerSection>
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
    </S.SingleCommentContainer>
  );
};

export const CommentReply = ({ data, parentNickname }: CommentProps) => {
  return (
    <div className="flex justify-end">
      <Comment data={data} parentNickname={parentNickname} isReply={true}></Comment>
    </div>
  );
};
