import React from "react";
import pointingFingerImg from "../../assets/icons/pointing-finger.png";

export const PointingFinger = () => {
  return (
    <img
      src={pointingFingerImg}
      className="mx-auto mt-[6vh] w-[10vh] h-[10vh] animate-bounce"
    />
  );
};
