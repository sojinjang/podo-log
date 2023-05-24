import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { EditingStickerInfo } from "src/@types/diary";
import { StickerInfo } from "src/@types/response";

const useNewSticker = () => {
  const DEFAULT_STKR_POS_X = 10;
  const DEFAULT_STKR_POS_Y = 10;
  const [selectedStickers, setSelectedStickers] = useState<EditingStickerInfo[]>([]);

  const handleAddNewSticker = (newSticker: StickerInfo) => {
    setSelectedStickers((curStickers) => {
      return [
        ...curStickers,
        {
          stickerId: newSticker.stickerId,
          stickedStickerId: uuidv4(),
          stickerImg: newSticker.stickerImg,
          locX: DEFAULT_STKR_POS_X,
          locY: DEFAULT_STKR_POS_Y,
        },
      ];
    });
  };
  const handleUpdateStickers = (newSticker: EditingStickerInfo) => {
    setSelectedStickers((curStickers) => {
      return [
        ...curStickers.filter(
          (sticker) => sticker.stickedStickerId !== newSticker.stickedStickerId
        ),
        newSticker,
      ];
    });
  };
  const handleDeleteStickers = (stickerBeDeleted: EditingStickerInfo) => {
    setSelectedStickers((curStickers) => {
      return curStickers.filter(
        (sticker) => sticker.stickedStickerId !== stickerBeDeleted.stickedStickerId
      );
    });
  };
  const handleResetSelectedStcks = () => {
    setSelectedStickers([]);
  };

  return {
    selectedStickers,
    handleAddNewSticker,
    handleUpdateStickers,
    handleDeleteStickers,
    handleResetSelectedStcks,
  };
};

export default useNewSticker;
