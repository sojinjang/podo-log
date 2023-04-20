import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { Diary } from "./DiaryListContainer";
import commentWebP from "../../assets/icons/comment.webp";
import commentPng from "../../assets/icons/comment.png";
import { AffixedSticker, AffixedStickerInfo } from "../common/diary/Sticker";
import { UnclickableContainer } from "../common/UnclickableContainer";
import { DiarySection } from "../common/diary/DiarySection";

interface DiaryContainerProps {
  viewRef?: () => void;
  data: Diary;
}

const DiaryContainer = ({ viewRef, data }: DiaryContainerProps) => {
  const navigate = useNavigate();
  const onClickDiary = () => {
    navigate(`${PRIVATE_ROUTE.books.path}/${data.bookId}/${data.diaryId}`, {
      state: {
        diaryInfo: data,
      },
    });
  };

  const [stickers, setStickers] = useState<AffixedStickerInfo[]>([]);
  const handleUpdateStickers = (newSticker: AffixedStickerInfo) => {
    setStickers((curStickers) => {
      return [
        ...curStickers.filter(
          (sticker) => sticker.stickedStickerId !== newSticker.stickedStickerId
        ),
        newSticker,
      ];
    });
  };
  useEffect(() => {
    if (data.stickers) setStickers(data.stickers);
  }, []);

  return (
    <Fade bottom duration={1000}>
      <UnclickableContainer className={ContainerStyle} onClick={onClickDiary} ref={viewRef}>
        {stickers.map((sticker) => {
          return (
            <AffixedSticker
              key={sticker.stickedStickerId}
              sticker={sticker}
              handleUpdateStickers={handleUpdateStickers}
            />
          );
        })}
        <DiarySection data={data} isDetailPage={false} />
        <CommentContainer>
          <CommentIcon>
            <source srcSet={commentWebP} type="image/webp" />
            <img alt="comment" src={commentPng} />
          </CommentIcon>
          <NumComments>{data.numComments}</NumComments>
        </CommentContainer>
      </UnclickableContainer>
    </Fade>
  );
};

export default DiaryContainer;

const ContainerStyle = `
cursor-pointer mb-[2vh]
hover:shadow-none ease-in duration-200
`;

const CommentContainer = tw.div`
flex justify-end 
`;

const CommentIcon = tw.picture`
w-[2.5vh] h-[2.5vh] my-auto
`;

const NumComments = tw.p`
text-[2.2vh] md:text-[2vh] ml-1 my-auto
`;
