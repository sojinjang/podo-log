import React from "react";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";

import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { setCookie } from "src/utils/cookie";
import { Keys } from "src/constants/Keys";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import PurpleButton from "../common/PurpleButton";

const Input = tw.input`
  font-[notosans] bg-transparent ml-[5px] text-sm sm:text-lg
`;

const InputContainer = tw.div`
  w-[65%] flex flex-col rounded-md bg-white/40 p-3 mx-auto mt-[1.5vh]
`;

interface loginInput {
  readonly email: string;
  readonly password: string;
}

const EmailLoginContainer = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<loginInput>({ mode: "onChange" });

  const logIn = async ({ email, password }: loginInput) => {
    try {
      const response = await post(API_URL.emailLogin, { email, password });
      setCookie(Keys.ACCESS_TOKEN, response.accessToken);
      navigate(PRIVATE_ROUTE.diaries.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(logIn)}>
      <InputContainer>
        <Input placeholder="email" type="email" required {...register("email")}></Input>
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="password"
          type="password"
          minLength={4}
          required
          {...register("password")}
        ></Input>
      </InputContainer>
      <PurpleButton description="Login" wrapperStyle="mt-[3vh] w-full" buttonStyle="w-[65%]" />
    </form>
  );
};

export default EmailLoginContainer;
