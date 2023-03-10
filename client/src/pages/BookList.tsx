import React from "react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { get } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";

import { PinkPurpleBackground } from "src/components/common/Backgrounds";
import { Guidance } from "src/components/book-list/Guidance";
import { PointingFinger } from "src/components/book-list/PointingFinger";
import { BooksContainer } from "src/components/book-list/BooksContainer";
import { Navbar } from "src/components/common/NavBar";

export interface DiaryInfo {
  readonly bookId: number;
  readonly bookName: string;
  readonly numMembers: number;
  readonly color: string;
}

export type DiaryArr = DiaryInfo[] | null;

const BookList = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [userDiaryArr, setUserDiaryArr] = useState<DiaryArr>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  async function getUserBookArr() {
    try {
      const response = await get(API_URL.books, "", accessToken);
      return response.data;
    } catch (err) {
      alert(err);
    }
  }
  const handleUserDiaryArr = async () => {
    const userDiaries = await getUserBookArr();
    setUserDiaryArr(userDiaries);
  };

  useEffect(() => {
    handleUserDiaryArr();
  }, []);

  useEffect(() => setIsEmpty(userDiaryArr?.length === 0 ? true : false), [userDiaryArr]);

  return (
    <PinkPurpleBackground>
      <div className="h-[89vh] overflow-y-scroll">
        <Guidance isEmpty={isEmpty}></Guidance>
        <PointingFinger />
        <BooksContainer isEmpty={isEmpty} userDiaryArr={userDiaryArr} />
      </div>
      <Navbar activeMenu="books" />
    </PinkPurpleBackground>
  );
};

export default BookList;
