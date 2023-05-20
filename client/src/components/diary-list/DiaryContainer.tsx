import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { Diary } from "src/@types/response";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import commentWebP from "src/assets/icons/comment.webp";
import commentPng from "src/assets/icons/comment.png";
import { AffixedSticker, DiarySection } from "src/components/common/diary";
import { AffixedStickerInfo } from "src/components/common/diary/AffixedSticker";
import * as G from "src/styles/Common";
import * as S from "src/styles/DiaryList";

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
      <G.UnclickableContainer
        className={S.ContainerStyle}
        onClick={onClickDiary}
        ref={viewRef}
      >
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
        <S.CommentContainer>
          <S.CommentIcon>
            <source srcSet={commentWebP} type="image/webp" />
            <img alt="comment" src={commentPng} />
          </S.CommentIcon>
          <S.NumComments>{data.numComments}</S.NumComments>
        </S.CommentContainer>
      </G.UnclickableContainer>
    </Fade>
  );
};

export default DiaryContainer;
