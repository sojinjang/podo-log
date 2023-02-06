import React from "react";
import tw from "tailwind-styled-components";
import { CommentType } from "./CommentSection";
import DefaultProfileImg from "../../assets/icons/default_profile.png";
import changeToKoreanTime from "src/utils/time";

interface Props {
  data: CommentType;
}
const Comment = ({ data }: Props) => {
  const profileImgSrc = data.profile === "없음" ? DefaultProfileImg : data.profile;
  const isRevised = data.createdAt !== data.updatedAt;

  return (
    <SingleFamilyComment>
      <div className="flex">
        <CommentWriterImg src={profileImgSrc}></CommentWriterImg>
        <div className="my-auto">
          <CommentWriter>{data.nickname}</CommentWriter>
          <div className="flex">
            <CommentDate>{changeToKoreanTime(data.updatedAt)}</CommentDate>
            {isRevised && <CommentDate className="ml-1">(수정됨)</CommentDate>}
          </div>
        </div>
      </div>
      <CommentContent>{data.reply}</CommentContent>
    </SingleFamilyComment>
  );
};

export default Comment;

const SingleFamilyComment = tw.div`
mb-2 md:mb-3
`;

const CommentWriterImg = tw.img`
w-[28px] h-[28px] min-[390px]:w-[38px] min-[390px]:h-[38px] md:w-[47px] md:h-[47px] 
rounded-full object-cover shadow-lg mr-2 md:mr-3
`;

const CommentWriter = tw.p`
text-[1.3vh] md:text-[1.2vh]
`;

const CommentDate = tw.p`
text-gray-1000 text-[0.9vh] md:text-[1vh]
`;

const CommentContent = tw.p`
text-[1.5vh] md:text-[1.3vh] mt-1 md:mt-2
`;
