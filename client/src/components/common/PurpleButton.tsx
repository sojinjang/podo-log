import React from "react";
import "./PurpleButton.css";

interface ButtonProps {
  readonly name: string;
  readonly cssClass: string;
  readonly onClickFunc: unknown;
  readonly onClickFuncArgs: unknown;
}

const PurpleButton = ({ name, cssClass, onClickFunc, onClickFuncArgs }: ButtonProps) => {
  return (
    <div className={`text-center ${cssClass}`}>
      <button
        className="purple-button sm:w-40 text-base sm:text-xl"
        role="button"
        onClick={() => {
          if (typeof onClickFunc === "function") return onClickFunc(onClickFuncArgs);
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default PurpleButton;
