import React from "react";
import { useEffect, useState } from "react";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Guidance } from "src/components/diary-list/Guidance";
import { PointingFinger } from "src/components/diary-list/PointingFinger";
import { HeartDiaryButton } from "src/components/diary-list/HeartDiaryButton";
import { DiaryButton } from "src/components/diary-list/DiaryButton";
import { Navbar } from "src/components/common/NavBar";

interface DiaryInfo {
  readonly bookId: number;
  readonly bookName: string;
  readonly numPpl: number;
  readonly color: string;
}

const DiaryList = () => {
  const [userDiaryArr, setUserDiaryArr] = useState<DiaryInfo[] | undefined>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  async function getUserDiaryArr() {
    try {
      // TODO: api 완성되는대로 db에서 받아온 데이터 return하도록 변경하기 23.01.22
      const userDiaryList: DiaryInfo[] = [
        { bookId: 1, bookName: "울 빼밀리 👨‍👩‍👧‍👧", numPpl: 4, color: "008fff" },
        { bookId: 2, bookName: "with 희찬 💖", numPpl: 2, color: "e054b8" },
        { bookId: 3, bookName: "집단적독백방 💬", numPpl: 5, color: "82af20" },
      ];
      return userDiaryList;
    } catch (err) {
      alert(err);
    }
  }
  const handleUserDiaryArr = async () => {
    const userDiaries = await getUserDiaryArr();
    setUserDiaryArr(userDiaries);
  };

  useEffect(() => {
    handleUserDiaryArr();
  }, []);
  useEffect(() => setIsEmpty(userDiaryArr?.length === 0 ? true : false), [userDiaryArr]);

  const renderDiaryButtons = (): JSX.Element[] | undefined => {
    const diaryButtons = userDiaryArr?.map((diary: DiaryInfo) => {
      return (
        <DiaryButton
          key={diary.bookId}
          name={diary.bookName}
          numPpl={diary.numPpl}
          color={diary.color}
        />
      );
    });
    return diaryButtons;
  };

  return (
    <PinkPurpleBackground>
      <div className="h-[calc(100vh-130px)] overflow-y-scroll">
        <Guidance isEmpty={isEmpty}></Guidance>
        <PointingFinger />
        {isEmpty && <HeartDiaryButton />}
        {!isEmpty && renderDiaryButtons()}
      </div>
      <Navbar />
    </PinkPurpleBackground>
  );
};

export default DiaryList;
