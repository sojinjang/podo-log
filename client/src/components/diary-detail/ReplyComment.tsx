import React from "react";
import Fade from "react-reveal/Fade";

import { NewCommentProps, NewComment } from "./NewComment";

interface ReplyCommentProps extends NewCommentProps {
  parentNickname: string;
}
export const ReplyComment = ({
  getComments,
  changeReplyState,
  parentNickname,
  parentCommentId = 0,
}: ReplyCommentProps) => {
  return (
    <Fade bottom>
      <>
        <div className="flex text-[1.5vh] min-[390px]:text-[1.3vh]">
          <div className="font-sans font-bold">{parentNickname}</div>
          <div className="font-sans">님에게 답글 남기는중</div>
        </div>
        <NewComment
          getComments={getComments}
          changeReplyState={changeReplyState}
          parentCommentId={parentCommentId}
        />
        <div className="h-[1vh]" />
      </>
    </Fade>
  );
};
