import Fade from "react-reveal/Fade";

import { PinkPurpleBackground } from "src/styles/Common";
import { BackButton, PageTitle } from "src/components/common";
import { PostButton } from "src/components/common/diary";
import NewDiaryForm from "src/components/new-diary";

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
