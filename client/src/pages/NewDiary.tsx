import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PostButton from "src/components/new-diary/PostButton";
import PageTitle from "src/components/common/PageTitle";
import NewDiaryForm from "src/components/new-diary/NewDiaryForm";

const NewDiary = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PostButton />
      <PageTitle title="일기 작성" />
      <NewDiaryForm />
    </PinkPurpleBackground>
  );
};

export default NewDiary;
