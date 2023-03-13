import React from "react";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { api } from "src/utils/axiosApi";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import { Input, InputContainer } from "src/components/common/Input";
import PurpleButton from "src/components/common/PurpleButton";

interface PasswordInput {
  readonly password: string;
  readonly newPassword: string;
  readonly newPwConfirm?: string | undefined;
}

const EditPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PasswordInput>({ mode: "onChange" });
  const pwConfirmRegister = register("newPwConfirm", {
    validate: (pwconfirm: string | undefined) => {
      const { newPassword } = getValues();
      return newPassword === pwconfirm || "비밀번호가 일치하지 않습니다.";
    },
  });

  const onSubmitEdit = async ({ password, newPassword }: PasswordInput) => {
    try {
      await api.patch(API_URL.users, { password, newPassword });
      navigate(PRIVATE_ROUTE.myPage.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <InputContainer>
        <Input
          placeholder="old password"
          type="password"
          minLength={4}
          required
          {...register("password")}
        />
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="new password"
          type="password"
          minLength={4}
          required
          {...register("newPassword")}
        />
      </InputContainer>
      <div className="w-[65%] mx-auto">
        <InputContainer className="w-full">
          <Input
            placeholder="confirm new password"
            type="password"
            minLength={4}
            required
            {...pwConfirmRegister}
          />
        </InputContainer>
        {errors.newPwConfirm && <PwConfirmMsg>{errors.newPwConfirm.message}</PwConfirmMsg>}
      </div>
      <PurpleButton
        description="수정하기"
        wrapperStyle="mt-[1.5vh] w-full"
        buttonStyle="w-[65%]"
      />
    </form>
  );
};

export default EditPassword;

const PwConfirmMsg = tw.p`
font-sans text-red-600 text-xs sm:text-base mt-1 ml-[5px]
`;
