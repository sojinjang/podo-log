import React from "react";
import "./PurpleButton.css";

interface ButtonProps {
  readonly description: string;
  readonly wrapperStyle: string;
  readonly buttonStyle: string;
  readonly onClickFunc: unknown;
  readonly onClickFuncArgs?: unknown;
}

const PurpleButton = ({
  description,
  wrapperStyle,
  buttonStyle,
  onClickFunc,
  onClickFuncArgs,
}: ButtonProps) => {
  return (
    <div className={`text-center ${wrapperStyle}`}>
      <button
        className={`purple-button text-base sm:text-xl ${buttonStyle}`}
        role="button"
        onClick={() => {
          if (typeof onClickFunc === "function") return onClickFunc(onClickFuncArgs);
        }}
      >
        {description}
      </button>
    </div>
  );
};

export default PurpleButton;
