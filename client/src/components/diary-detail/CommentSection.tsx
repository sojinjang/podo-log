import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { CommentFamType } from "src/@types/response";
import { getComments } from "src/recoil/diary-detail";
import NewComment from "./NewComment";
import CommentsFamily from "./CommentsFamily";
import * as S from "src/styles/DiaryDetail";

interface CommentSectionProps {
  updateNumComments: (newNumComments: number) => void;
}

const CommentSection = ({ updateNumComments }: CommentSectionProps) => {
  const comments = useRecoilValue<CommentFamType[]>(getComments);
  const reloadComments = useSetRecoilState(getComments);
  const reCommentsSum = comments.reduce((accumulator, currentObj) => {
    if (currentObj.reComments) return accumulator + currentObj.reComments.length;
    return accumulator;
  }, 0);

  useEffect(() => {
    reloadComments(1);
  }, []);
  useEffect(() => {
    if (comments.length) updateNumComments(comments.length + reCommentsSum);
  }, [comments]);

  return (
    <div className="pb-6 md:pb-8">
      <S.Divider />
      <S.NumCommentsWrapper>댓글 {comments.length + reCommentsSum}</S.NumCommentsWrapper>
      {comments.map((commentsFam) => {
        return (
          <CommentsFamily
            commentsFam={commentsFam}
            key={commentsFam.parentComment?.commentId}
          />
        );
      })}
      <div className="h-[2vh]" />
      <NewComment />
    </div>
  );
};

export default CommentSection;
