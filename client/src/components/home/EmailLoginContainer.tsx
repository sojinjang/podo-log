import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { post } from "src/utils/api";
import { refreshToken } from "src/utils/token";
import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { Input, InputContainer } from "../common/Input";
import PurpleButton from "../common/PurpleButton";

interface LoginProps {
  readonly tokenExpireTime: number;
  readonly refreshTime: number;
}

interface loginInput {
  readonly email: string;
  readonly password: string;
}

const EmailLoginContainer = ({ tokenExpireTime, refreshTime }: LoginProps) => {
  const { register, handleSubmit } = useForm<loginInput>({ mode: "onSubmit" });
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const logIn = async ({ email, password }: loginInput) => {
    try {
      const response = await post(API_URL.emailLogin, { email, password });
      setAccessToken(response.data.accessToken);
      setInterval(() => refreshToken(setAccessToken), tokenExpireTime - refreshTime);
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
