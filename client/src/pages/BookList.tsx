import React from "react";
import { useEffect, useState } from "react";

import { api } from "src/utils/axiosApi";
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
  const [userBooksArr, setUserBooksArr] = useState<BooksArr>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const handleUserBooksArr = async () => {
    try {
      const { data } = await api.get(API_URL.books);
      setUserBooksArr(data.data);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
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
