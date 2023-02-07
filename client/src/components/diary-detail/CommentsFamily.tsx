import React from "react";

import { DiaryId } from "./DetailedDiaryContainer";
import { Comment, CommentReply } from "./Comment";
import { ReplyComment } from "./ReplyComment";
import { CommentFamType } from "./CommentSection";

interface CommentsFamilyProps extends DiaryId {
  commentsFam: CommentFamType;
}

export const CommentsFamily = ({ diaryId, commentsFam }: CommentsFamilyProps) => {
  return (
    <React.Fragment key={commentsFam.parentComment?.commentId}>
      <Comment data={commentsFam.parentComment} />
      {commentsFam.reComments?.map((recomment) => {
        return <CommentReply data={recomment} key={recomment.commentId} />;
      })}
      <ReplyComment
        diaryId={diaryId}
        parentNickname={commentsFam.parentComment.nickname}
        parentCommentId={commentsFam.parentComment.commentId}
      />
    </React.Fragment>
  );
};
