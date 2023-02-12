import React from "react";
import { useLocation } from "react-router-dom";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import { DetailedDiaryContainer } from "src/components/diary-detail/DetailedDiaryContainer";
import { StickerSection } from "src/components/diary-detail/StickerSection";
import StickerSaveBtn from "src/components/diary-detail/StickerSaveBtn";

const DiaryDetail = () => {
  const location = useLocation();
  const isEditingSticker = true;
  return (
    <PinkPurpleBackground className="overflow-y-scroll">
      <BackButton />
      {isEditingSticker && <StickerSaveBtn />}
      <DetailedDiaryContainer data={location.state.diaryInfo} />
      {isEditingSticker && (
        <>
          <StickerSection />
          <div className="h-[23vh] " />
        </>
      )}
    </PinkPurpleBackground>
  );
};

export default DiaryDetail;
