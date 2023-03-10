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

export interface BookInfo {
  readonly bookId: number;
  readonly bookName: string;
  readonly numMembers: number;
  readonly color: string;
}

export type BooksArr = BookInfo[] | null;

const BookList = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [userBooksArr, setUserBooksArr] = useState<BooksArr>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  async function getUserBookArr() {
    try {
      const response = await get(API_URL.books, "", accessToken);
      return response.data;
    } catch (err) {
      alert(err);
    }
  }
  const handleUserBooksArr = async () => {
    const userDiaries = await getUserBookArr();
    setUserBooksArr(userDiaries);
  };

  useEffect(() => {
    handleUserBooksArr();
  }, []);

  useEffect(() => setIsEmpty(userBooksArr?.length === 0 ? true : false), [userBooksArr]);

  return (
    <PinkPurpleBackground>
      <div className="h-[89vh] overflow-y-scroll">
        <Guidance isEmpty={isEmpty}></Guidance>
        <PointingFinger />
        <BooksContainer isEmpty={isEmpty} userBooksArr={userBooksArr} />
      </div>
      <Navbar activeMenu="books" />
    </PinkPurpleBackground>
  );
};

export default BookList;
