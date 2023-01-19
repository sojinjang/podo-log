import React from "react";
import tw from "tailwind-styled-components";
import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Guidance } from "src/components/diary-list/Guidance";

const DiaryList = () => {
  return (
    <PinkPurpleBackground>
      <Guidance>
        일기장을 클릭해
        <br />
        가까운 사람들과
        <br />
        일기를 공유해보세요
      </Guidance>
    </PinkPurpleBackground>
  );
};

export default DiaryList;
