import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { NewComment } from "./NewComment";
import { Divider, NumCommentsWrapper } from "./CommentSection";
import { CommentLowerSection, CommentUpperSection } from "./Comment";
import tw from "tailwind-styled-components";

interface CommentsSkeletonProps {
  numComments: number;
}

const CommentsSkeleton = ({ numComments }: CommentsSkeletonProps) => {
  const componentArray = Array.from(Array(numComments).keys());

  return (
    <div className="pb-6 md:pb-8">
      <Divider />
      <NumCommentsWrapper>댓글 {numComments}</NumCommentsWrapper>
      {componentArray.map((idx) => {
        return (
          <React.Fragment key={idx}>
            <CommentUpperSection>
              <WriterProfile />
              <div className="w-[90%]">
                <div className="w-[10%] mb-1 h-[1.6vh] min-[390px]:h-[1.4vh]">
                  <TextSkeleton />
                </div>
                <div className="w-[30%] h-[1.6vh] min-[390px]:h-[1.4vh]">
                  <TextSkeleton />
                </div>
              </div>
            </CommentUpperSection>
            <CommentLowerSection>
              <div className="w-full mb-1 md:mb-2">
                <TextSkeleton />
              </div>
            </CommentLowerSection>
          </React.Fragment>
        );
      })}
      <div className="h-[2vh]" />
      <NewComment />
    </div>
  );
};

export default CommentsSkeleton;

const WriterProfile = tw.div`
w-[30px] h-[30px] min-[390px]:w-[38px] min-[390px]:h-[38px] md:w-[48px] md:h-[48px] 
rounded-full shadow-lg mr-2 md:mr-3 bg-gray-200
`;

const TextSkeleton = tw(Skeleton)`
h-[1.6vh] min-[390px]:h-[1.4vh]
`;
