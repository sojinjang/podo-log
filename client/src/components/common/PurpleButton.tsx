import React from "react";
import "./PurpleButton.css";

interface ButtonProps {
  readonly name: string;
  readonly cssClass: string;
  onClickFunc: () => void;
}

const PurpleButton = ({ name, cssClass, onClickFunc }: ButtonProps) => {
  return (
    <div className={`text-center ${cssClass}`}>
      <button
        className="purple-button sm:w-40 text-base sm:text-xl"
        role="button"
        onClick={() => {
          onClickFunc();
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default PurpleButton;
