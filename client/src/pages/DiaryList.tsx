import React from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Guidance } from "src/components/diary-list/Guidance";
import { PointingFinger } from "src/components/diary-list/PointingFinger";
import { HeartDiary } from "src/components/diary-list/HeartDiary";
import { Navbar } from "src/components/common/NavBar";
const DiaryList = () => {
  return (
    <PinkPurpleBackground>
      <div className="h-[calc(100vh-130px)] overflow-y-scroll">
        <Guidance>
          일기장을 클릭해
          <br />
          가까운 사람들과
          <br />
          일기를 공유해보세요
        </Guidance>
        <PointingFinger />
        <HeartDiary />
      </div>
      <Navbar />
    </PinkPurpleBackground>
  );
};

export default DiaryList;
