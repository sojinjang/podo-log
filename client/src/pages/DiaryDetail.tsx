import React from "react";
import { useLocation } from "react-router-dom";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";
import DetailedDiaryContainer from "src/components/diary-detail/DetailedDiaryContainer";

const DiaryDetail = () => {
  const location = useLocation();
  return (
    <PinkPurpleBackground className="overflow-y-scroll">
      <BackButton />
      <DetailedDiaryContainer data={location.state.diaryInfo} />
    </PinkPurpleBackground>
  );
};

export default DiaryDetail;
