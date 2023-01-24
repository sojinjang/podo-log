import React from "react";
import "./PurpleButton.css";

interface ButtonProps {
  readonly name: string;
  readonly cssClass: string;
}

const PurpleButton = ({ name, cssClass }: ButtonProps) => {
  return (
    <div className={`text-center ${cssClass}`}>
      <button className="purple-button sm:w-40 text-base sm:text-xl" role="button">
        {name}
      </button>
    </div>
  );
};

export default PurpleButton;
