import React from "react";
import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import BackButton from "src/components/common/BackButton";
import PageTitle from "src/components/common/PageTitle";
import PostButton from "src/components/diary/PostButton";
import DiaryRevisionForm from "src/components/diary-revision/DiaryRevisionForm";

const DiaryRevision = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PostButton />
      <PageTitle title="일기 수정" />
      <Fade duration={2000}>
        <DiaryRevisionForm />
      </Fade>
    </PinkPurpleBackground>
  );
};

export default DiaryRevision;
