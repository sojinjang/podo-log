import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import { PUBLIC_ROUTE } from "src/router/ROUTE_INFO";

const SignUpPhrase = tw.p`
font-[notosans] font-semibold text-slate-50 text-sm sm:text-lg
cursor-pointer underline drop-shadow-lg shadow-black text-center
`;

const SignUpButton = () => {
  const navigate = useNavigate();
  const onClickSignUp = () => {
    navigate(PUBLIC_ROUTE.signUp.path);
  };
  return <SignUpPhrase onClick={onClickSignUp}>Sign Up</SignUpPhrase>;
};

export default SignUpButton;
