import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "../components/common/BackButton";

const DiaryDetail = () => {
  return (
    <PinkPurpleBackground className="overflow-y-scroll">
      <BackButton />
    </PinkPurpleBackground>
  );
};

export default DiaryDetail;
