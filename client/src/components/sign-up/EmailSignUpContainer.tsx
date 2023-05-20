import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { SignUpInput } from "src/@types/input";
import { profileImgAtom } from "src/recoil/sign-up";
import { Img } from "src/recoil/sign-up/atom";
import { PUBLIC_ROUTE } from "src/router/ROUTE_INFO";
import { API_URL } from "src/constants/API_URL";
import { ProfileImgUpload } from "./ProfileImgUpload";
import PurpleButton from "../common/PurpleButton";
import { formApi } from "src/utils/axiosApi/formApi";
import * as G from "src/styles/Common";
import * as S from "src/styles/Home";

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
      <G.InputContainer>
        <G.Input placeholder="nickname" minLength={2} required {...register("nickname")} />
      </G.InputContainer>
      <G.InputContainer>
        <G.Input placeholder="email" type="email" required {...register("email")} />
      </G.InputContainer>
      <G.InputContainer>
        <G.Input
          placeholder="password"
          type="password"
          minLength={4}
          required
          {...register("password")}
        />
      </G.InputContainer>
      <div className="w-[65%] mx-auto">
        <G.InputContainer className="w-full">
          <G.Input
            placeholder="confirm password"
            type="password"
            minLength={4}
            required
            {...pwConfirmRegister}
          />
        </G.InputContainer>
        {errors.pwConfirm && <S.PwConfirmMsg>{errors.pwConfirm.message}</S.PwConfirmMsg>}
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
