import React from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { profileImgAtom } from "src/recoil/sign-up";
import { Img } from "src/recoil/sign-up/atom";
import { PUBLIC_ROUTE } from "src/router/ROUTE_INFO";
import { API_URL } from "src/constants/API_URL";
import { ProfileImgUpload } from "./ProfileImgUpload";
import { Input, InputContainer } from "../common/Input";
import PurpleButton from "../common/PurpleButton";
import { formApi } from "src/utils/axiosApi/formApi";

interface SignUpInput {
  readonly nickname: string;
  readonly email: string;
  readonly password: string;
  readonly pwConfirm?: string | undefined;
}

const createSignUpForm = (profileImg: Img, { nickname, email, password }: SignUpInput) => {
  const formData = new FormData();
  if (profileImg) formData.append("profile", profileImg);
  formData.append("nickname", nickname);
  formData.append("email", email);
  formData.append("password", password);

  return formData;
};

const EmailSignUpContainer = () => {
  const navigate = useNavigate();
  const profileImg = useRecoilValue(profileImgAtom);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignUpInput>({ mode: "onChange" });

  const pwConfirmRegister = register("pwConfirm", {
    validate: (pwconfirm: string | undefined) => {
      const { password } = getValues();
      return password === pwconfirm || "비밀번호가 일치하지 않습니다.";
    },
  });

  const onSubmitSignUp = async ({ nickname, email, password }: SignUpInput) => {
    const formData = createSignUpForm(profileImg, { nickname, email, password });
    try {
      await formApi.post(API_URL.users, formData);
      confirm("Welcome to PODOLOG! 🍇");
      navigate(PUBLIC_ROUTE.home.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSignUp)} encType="multipart/form-data">
      <ProfileImgUpload />
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
font-sans text-red-600 text-xs sm:text-base mt-1 ml-[5px]
`;
