import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Guidance } from "src/components/diary-list/Guidance";
import { PointingFinger } from "src/components/diary-list/PointingFinger";
import { HeartDiary } from "src/components/diary-list/HeartDiary";
import { Navbar } from "src/components/common/NavBar";
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
      <PointingFinger />
      <HeartDiary />
      <Navbar />
    </PinkPurpleBackground>
  );
};

export default DiaryList;
