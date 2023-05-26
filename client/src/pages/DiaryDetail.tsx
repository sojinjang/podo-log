import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import Fade from "react-reveal/Fade";

import { focusedDiaryIdAtom, isDeleteModalVisibleAtom } from "src/recoil/diary-detail/atom";
import { BackButton } from "src/components/common";
import { StickerSaveBtn, StickerSection, DiaryContainer } from "src/components/diary-detail";
import useNewSticker from "src/hooks/useNewSticker";
import useAffixedSticker from "src/hooks/useAffixedSticker";
import * as G from "src/styles/Common";

const DiaryDetail = () => {
  const params = useParams();
  const location = useLocation();
  const data = location.state.diaryInfo;
  const setDiaryId = useSetRecoilState(focusedDiaryIdAtom);
  const resetDiaryId = useResetRecoilState(focusedDiaryIdAtom);
  const resetIsDeleteModalVisible = useResetRecoilState(isDeleteModalVisibleAtom);
  const {
    selectedStickers,
    handleAddNewSticker,
    handleUpdateStickers,
    handleDeleteStickers,
    handleResetSelectedStcks,
  } = useNewSticker();
  const { stickers, handleUpdateAffixedStickers } = useAffixedSticker(Number(params.diaryId));
  const [isStickerEditing, setIsStickerEditing] = useState<boolean>(false);
  const changeStickerEditState = () => {
    setIsStickerEditing((prev) => !prev);
  };

  useEffect(() => {
    setDiaryId(Number(params.diaryId));
  }, []);

  useEffect(() => {
    return () => {
      resetDiaryId();
      resetIsDeleteModalVisible();
      setIsStickerEditing(false);
    };
  }, []);

  return (
    <G.PinkPurpleBackground className="overflow-auto">
      <BackButton />
      {isStickerEditing && (
        <StickerSaveBtn
          selectedStickers={selectedStickers}
          handleUpdateStickers={handleUpdateAffixedStickers}
          handleResetSelectedStcks={handleResetSelectedStcks}
          changeStickerEditState={changeStickerEditState}
        />
      )}
      <Fade bottom>
        <DiaryContainer
          isStickerEditing={isStickerEditing}
          stickers={stickers}
          handleUpdateAffixedStickers={handleUpdateAffixedStickers}
          handleUpdateStickers={handleUpdateStickers}
          handleDeleteStickers={handleDeleteStickers}
          changeStickerEditState={changeStickerEditState}
          selectedStickers={selectedStickers}
          data={data}
        />
      </Fade>
      {isStickerEditing && (
        <>
          <StickerSection
            changeEditState={changeStickerEditState}
            handleAddNewSticker={handleAddNewSticker}
          />
          <div className="h-[23vh]" />
        </>
      )}
    </G.PinkPurpleBackground>
  );
};

export default DiaryDetail;
