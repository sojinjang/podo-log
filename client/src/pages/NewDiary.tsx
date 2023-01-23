import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";

const NewDiary = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PageTitle title="일기장 만들기"></PageTitle>
    </PinkPurpleBackground>
  );
};

export default NewDiary;
