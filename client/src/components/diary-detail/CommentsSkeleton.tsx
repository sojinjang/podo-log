import React from "react";
import "react-loading-skeleton/dist/skeleton.css";

import NewComment from "./NewComment";
import * as S from "src/styles/DiaryDetail";

interface CommentsSkeletonProps {
  numComments: number;
}

const CommentsSkeleton = ({ numComments }: CommentsSkeletonProps) => {
  const componentArray = Array.from(Array(numComments).keys());

  return (
    <div className="pb-6 md:pb-8">
      <S.Divider />
      <S.NumCommentsWrapper>댓글 {numComments}</S.NumCommentsWrapper>
      {componentArray.map((idx) => {
        return (
          <React.Fragment key={idx}>
            <S.CommentUpperSection>
              <S.WriterProfileSkeleton />
              <div className="w-[90%]">
                <div className="w-[10%] mb-1 h-[1.6vh] min-[390px]:h-[1.4vh]">
                  <S.TextSkeleton />
                </div>
                <div className="w-[30%] h-[1.6vh] min-[390px]:h-[1.4vh]">
                  <S.TextSkeleton />
                </div>
              </div>
            </S.CommentUpperSection>
            <S.CommentLowerSection>
              <div className="w-full mb-1 md:mb-2">
                <S.TextSkeleton />
              </div>
            </S.CommentLowerSection>
          </React.Fragment>
        );
      })}
      <div className="h-[2vh]" />
      <NewComment />
    </div>
  );
};

export default CommentsSkeleton;
