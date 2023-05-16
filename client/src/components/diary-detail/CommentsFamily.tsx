import React, { useState } from "react";

import { CommentFamType } from "src/@types/response";
import { Comment, CommentReply } from "./Comment";
import { NewCommentReply } from "./NewCommentReply";

interface CommentsFamilyProps {
  commentsFam: CommentFamType;
}

export const CommentsFamily = ({ commentsFam }: CommentsFamilyProps) => {
  const [isReplyWritingEnabled, setIsReplyWritingEnabled] = useState(false);
  const changeReplyState = () => {
    setIsReplyWritingEnabled((prev) => !prev);
  };

  return (
    <React.Fragment key={commentsFam.parentComment?.commentId}>
      <Comment data={commentsFam.parentComment} changeReplyState={changeReplyState} />
      {commentsFam.reComments?.map((recomment) => {
        return (
          <CommentReply
            parentNickname={commentsFam.parentComment.nickname}
            data={recomment}
            key={recomment.commentId}
          />
        );
      })}
      {isReplyWritingEnabled && (
        <NewCommentReply
          changeReplyState={changeReplyState}
          parentNickname={commentsFam.parentComment.nickname}
          parentCommentId={commentsFam.parentComment.commentId}
        />
      )}
    </React.Fragment>
  );
};
