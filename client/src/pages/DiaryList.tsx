import { PinkPurpleBackground } from "src/styles/Common";
import { BackButton } from "src/components/common";
import {
  BookName,
  DiaryListContainer,
  NewDiaryButton,
  SettingButton,
} from "src/components/diary-list";

const DiaryList = () => {
  return (
    <PinkPurpleBackground className="overflow-y-scroll">
      <BackButton />
      <SettingButton />
      <BookName />
      <NewDiaryButton />
      <DiaryListContainer />
    </PinkPurpleBackground>
  );
};

export default DiaryList;
