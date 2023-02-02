import React from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { profileImgAtom } from "src/recoil/sign-up";
import { postBlob } from "src/utils/api";
import { PUBLIC_ROUTE } from "src/router/ROUTE_INFO";
import { API_URL } from "src/constants/API_URL";
import { ProfileImgUpload } from "./ProfileImgUpload";
import { Input, InputContainer } from "../common/Input";
import PurpleButton from "../common/PurpleButton";

interface SignUpInput {
  readonly nickname: string;
  readonly email: string;
  readonly password: string;
  readonly pwConfirm: string;
}

const EmailSignUpContainer = () => {
  const navigate = useNavigate();
  const imgFile = useRecoilValue(profileImgAtom);
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
    // const formData = new FormData();
    // if (typeof imgFile === "string" && imgFile.length > 0) formData.append("profile", imgFile);
    // formData.append("nickname", JSON.stringify(nickname));
    // formData.append("email", JSON.stringify(email));
    // formData.append("password", JSON.stringify(password));
    try {
      await postBlob(API_URL.users, imgFile, { nickname, email, password });
      //   await postBlob(API_URL.users, formData);
      confirm("Welcome to PODOLOG! 🍇");
      navigate(PUBLIC_ROUTE.home.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(SignUp)}>
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
font-[notosans] text-red-600 text-xs sm:text-base mt-1 ml-[5px]
`;
