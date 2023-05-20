import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { Diary } from "src/@types/response";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import DiaryContainer from "./DiaryContainer";

const DiaryListContainer = () => {
  const LIMIT = 5;
  const params = useParams();
  const bookId = Number(params.bookId);

  const [ref, inView] = useInView();
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [startIdx, setStartIdx] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  const getDiaryList = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(API_URL.diaryList(bookId, LIMIT, startIdx));
      const diaryList = data.data;
      if (startIdx === 1) {
        const uniqueDiaries = [...diaries, ...diaryList].filter(
          (item, index, array) => array.findIndex((t) => t.diaryId === item.diaryId) === index
        );
        setDiaries(uniqueDiaries);
      } else {
        setDiaries((prevDiaries) => [...prevDiaries, ...diaryList]);
      }
      setIsLoading(false);
      if (diaryList.length < LIMIT) setHasNextPage(false);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  }, [startIdx]);

  const handleStartIdx = () => {
    if (inView && !isLoading && hasNextPage) {
      setStartIdx((prevState) => prevState + LIMIT);
    }
  };

  useEffect(() => {
    getDiaryList();
  }, [getDiaryList]);
  useEffect(() => {
    handleStartIdx();
  }, [inView, isLoading]);

  return (
    <div>
      {diaries.map((diary, idx) => {
        return (
          <React.Fragment key={idx}>
            {diaries.length - 1 === idx ? (
              <DiaryContainer viewRef={ref} data={diary}></DiaryContainer>
            ) : (
              <DiaryContainer data={diary}></DiaryContainer>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DiaryListContainer;
