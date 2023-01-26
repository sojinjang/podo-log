import React from "react";
import tw from "tailwind-styled-components";

const SignUpPhrase = tw.p`
font-[notosans] font-semibold text-slate-50 text-sm sm:text-lg
cursor-pointer underline drop-shadow-lg shadow-black text-center
`;

const SignUpButton = () => {
  return <SignUpPhrase>Sign Up</SignUpPhrase>;
};

export default SignUpButton;
