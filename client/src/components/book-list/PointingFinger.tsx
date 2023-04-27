import React from "react";
import pointingFingerWebP from "../../assets/icons/pointing-finger.webp";
import pointingFingerPng from "../../assets/icons/pointing-finger.png";

export const PointingFinger = () => {
  return (
    <picture>
      <source srcSet={pointingFingerWebP} type="image/webp" />
      <img
        alt="pointing-finger"
        src={pointingFingerPng}
        className="mx-auto mt-[6vh] w-[10vh] h-[10vh] animate-bounce"
      />
    </picture>
  );
};
