import { PinkPurpleBackground } from "src/styles/Common";
import { BackButton, PageTitle } from "src/components/common";
import { PostButton } from "src/components/common/diary";
import DiaryRevisionForm from "src/components/diary-revision";

const DiaryRevision = () => {
  return (
    <PinkPurpleBackground>
      <BackButton />
      <PostButton />
      <PageTitle title="일기 수정" />
      <DiaryRevisionForm />
    </PinkPurpleBackground>
  );
};

export default DiaryRevision;
