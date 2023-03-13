import React from "react";
import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PostButton from "src/components/diary/PostButton";
import PageTitle from "src/components/common/PageTitle";
import NewDiaryForm from "src/components/new-diary/NewDiaryForm";

const NewDiary = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PostButton />
      <PageTitle title="일기 작성" />
      <Fade bottom>
        <NewDiaryForm />
      </Fade>
    </PinkPurpleBackground>
  );
};

export default NewDiary;
