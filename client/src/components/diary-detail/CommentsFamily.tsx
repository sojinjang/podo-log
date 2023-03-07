import React, { useState } from "react";

import { Comment, CommentReply } from "./Comment";
import { NewCommentReply } from "./NewCommentReply";
import { CommentFamType } from "./CommentSection";

interface CommentsFamilyProps {
  commentsFam: CommentFamType;
  getComments: () => void;
}

export const CommentsFamily = ({ commentsFam, getComments }: CommentsFamilyProps) => {
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
          getComments={getComments}
          changeReplyState={changeReplyState}
          parentNickname={commentsFam.parentComment.nickname}
          parentCommentId={commentsFam.parentComment.commentId}
        />
      )}
    </React.Fragment>
  );
};
