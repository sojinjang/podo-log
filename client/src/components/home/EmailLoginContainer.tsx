import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { Input, InputContainer } from "../common/Input";
import PurpleButton from "../common/PurpleButton";
import { api } from "src/utils/axiosApi";

interface loginInput {
  readonly email: string;
  readonly password: string;
}

const EmailLoginContainer = () => {
  const { register, handleSubmit } = useForm<loginInput>({ mode: "onSubmit" });
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const logIn = async ({ email, password }: loginInput) => {
    try {
      const { data } = await api.post(API_URL.emailLogin, { email, password });
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;
      setAccessToken(data.data.accessToken);
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
