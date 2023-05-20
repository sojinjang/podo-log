import Fade from "react-reveal/Fade";

import { NewCommentProps } from "./NewComment";
import NewComment from "./NewComment";

interface NewCommentReplyProps extends NewCommentProps {
  parentNickname: string;
}

export const NewCommentReply = ({
  changeReplyState,
  parentNickname,
  parentCommentId = 0,
}: NewCommentReplyProps) => {
  return (
    <Fade bottom>
      <>
        <div className="flex text-[1.5vh] min-[390px]:text-[1.3vh]">
          <div className="font-sans font-bold">{parentNickname}</div>
          <div className="font-sans">님에게 답글 남기는중</div>
        </div>
        <NewComment changeReplyState={changeReplyState} parentCommentId={parentCommentId} />
        <div className="h-[1vh]" />
      </>
    </Fade>
  );
};
