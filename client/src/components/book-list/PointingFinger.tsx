import React from "react";
import pointingFingerWebP from "../../assets/icons/pointing-finger.webp";
import pointingFingerPng from "../../assets/icons/pointing-finger.png";
import * as S from "../../styles/BookList";

export const PointingFinger = () => {
  return (
    <picture>
      <source srcSet={pointingFingerWebP} type="image/webp" />
      <S.PointingFingerImg alt="pointing-finger" src={pointingFingerPng} />
    </picture>
  );
};
