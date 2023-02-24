import React from "react";
import "./PurpleButton.css";

interface ButtonProps {
  readonly description: string;
  readonly wrapperStyle?: string;
  readonly buttonStyle?: string;
}

const PurpleButton = ({ description, wrapperStyle, buttonStyle }: ButtonProps) => {
  return (
    <div className={`text-center ${wrapperStyle}`}>
      <button className={`purple-button text-[1.2vh] ${buttonStyle}`} role="button">
        {description}
      </button>
    </div>
  );
};

export default PurpleButton;
