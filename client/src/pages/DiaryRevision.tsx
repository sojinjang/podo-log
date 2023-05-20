import { PinkPurpleBackground } from "src/styles/Common";
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
      <DiaryRevisionForm />
    </PinkPurpleBackground>
  );
};

export default DiaryRevision;
