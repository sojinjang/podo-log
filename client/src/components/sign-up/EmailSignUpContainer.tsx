import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { post } from "src/utils/api";
import { PUBLIC_ROUTE } from "src/router/ROUTE_INFO";
import { API_URL } from "src/constants/API_URL";
import { Input, InputContainer } from "../common/Input";
import PurpleButton from "../common/PurpleButton";

interface SignUpInput {
  //   readonly profile?: any;
  readonly nickname: string;
  readonly email: string;
  readonly password: string;
}

const EmailSignUpContainer = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignUpInput>({ mode: "onChange" });

  const SignUp = async ({ nickname, email, password }: SignUpInput) => {
    try {
      await post(API_URL.users, { nickname, email, password });
      navigate(PUBLIC_ROUTE.home.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(SignUp)}>
      <InputContainer>
        <Input placeholder="nickname" minLength={2} required {...register("nickname")}></Input>
      </InputContainer>
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
      <PurpleButton
        description="Sign Up"
        wrapperStyle="mt-[3vh] w-full"
        buttonStyle="w-[65%]"
      />
    </form>
  );
};

export default EmailSignUpContainer;
