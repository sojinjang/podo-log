import React from "react";
import grapeImgPng from "../../assets/icons/grape_8.png";
import grapeImgWebP from "../../assets/icons/grape_8.webp";

export const GrapeIcon = () => {
  return (
    <picture>
      <source srcSet={grapeImgWebP} type="image/webp" />
      <source srcSet={grapeImgPng} type="image/png" />
      <img
        src={grapeImgPng}
        alt="grape"
        className="m-auto mt-[4vh] sm:mt-[6vh] w-[23vh] h-[23vh] opacity-95"
      />
    </picture>
  );
};
