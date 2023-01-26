import React from "react";
import { useForm } from "react-hook-form";
import tw from "tailwind-styled-components";

import PurpleButton from "../common/PurpleButton";

const Input = tw.input`
  font-[notosans] bg-transparent ml-[5px] sm:text-lg
`;

const InputContainer = tw.div`
  w-[65%] flex flex-col rounded-md bg-white/40 p-3 mx-auto mt-[1.5vh]
`;

interface loginInput {
  readonly email: string;
  readonly password: string;
}

const EmailLoginContainer = () => {
  const { register, handleSubmit } = useForm<loginInput>({ mode: "onChange" });

  const logIn = ({ email, password }: loginInput) => {
    try {
      return { email, password };
    } catch (err) {
      alert(err);
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
          minLength={5}
          required
          {...register("password")}
        ></Input>
      </InputContainer>
      <PurpleButton description="Login" wrapperStyle="mt-[3vh] w-full" buttonStyle="w-[65%]" />
    </form>
  );
};

export default EmailLoginContainer;
