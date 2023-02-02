import React from "react";
import tw from "tailwind-styled-components";
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
  readonly pwConfirm: string;
}

const EmailSignUpContainer = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpInput>({ mode: "onChange" });

  const pwConfirmRegister = register("pwConfirm", {
    validate: (pwconfirm: string) => {
      const { password } = getValues();
      return password === pwconfirm || "비밀번호가 일치하지 않습니다.";
    },
  });

  const SignUp = async ({ nickname, email, password }: SignUpInput) => {
    try {
      await post(API_URL.users, { nickname, email, password });
      confirm("Welcome to PODOLOG! 🍇");
      navigate(PUBLIC_ROUTE.home.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(SignUp)}>
      <InputContainer>
        <Input placeholder="nickname" minLength={2} required {...register("nickname")} />
      </InputContainer>
      <InputContainer>
        <Input placeholder="email" type="email" required {...register("email")} />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="password"
          type="password"
          minLength={4}
          required
          {...register("password")}
        />
      </InputContainer>
      <div className="w-[65%] mx-auto">
        <InputContainer className="w-full">
          <Input
            placeholder="confirm password"
            type="password"
            minLength={4}
            required
            {...pwConfirmRegister}
          />
        </InputContainer>
        {errors.pwConfirm && <PwConfirmMsg>{errors.pwConfirm.message}</PwConfirmMsg>}
      </div>
      <PurpleButton
        description="Sign Up"
        wrapperStyle="mt-[3vh] w-full"
        buttonStyle="w-[65%]"
      />
    </form>
  );
};

export default EmailSignUpContainer;

const PwConfirmMsg = tw.p`
font-[notosans] text-red-600 text-xs sm:text-base mt-1 ml-[5px]
`;
