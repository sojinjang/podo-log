import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { get } from "src/utils/api";
import { useDidMountEffect } from "src/utils/hooks";
import { API_URL } from "src/constants/API_URL";

interface Diary {
  bookId: number;
  diaryId: number;
  userId: number;
  nickname: string;
  title: string;
  content: string;
  profile: null | string;
  picture: null | string;
  createdAt: Date;
  updatedAt: Date;
  //TODO: comment 칼럼 추가해주면 아래 라인 추가
  //   numComments: number;
}

const DiaryListContainer = () => {
  const LIMIT = 5;
  const params = useParams();
  const bookId = Number(params.bookId);

  const [ref, inView] = useInView();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [startIdx, setStartIdx] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const getDiaryList = useCallback(async () => {
    try {
      setIsLoading(true);
      const diaryList = await get(API_URL.diaryList(bookId, LIMIT, startIdx));
      setDiaries((prevDiaries) => [...prevDiaries, ...diaryList]);
      setIsLoading(false);
      if (diaryList.length < LIMIT) {
        setHasNextPage(false);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  }, [startIdx]);

  const handleStartIdx = () => {
    if (inView && !isLoading && hasNextPage) {
      setStartIdx((prevState) => prevState + LIMIT);
    }
  };

  useDidMountEffect(getDiaryList, [getDiaryList]);
  useDidMountEffect(handleStartIdx, [inView, isLoading]);

  console.log(diaries);
  return (
    <div>
      {diaries.map((diary, idx) => {
        return (
          <React.Fragment key={idx}>
            {diaries.length - 1 === idx ? (
              <div ref={ref}>{diary.title}</div>
            ) : (
              <div>{diary.title}</div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DiaryListContainer;
