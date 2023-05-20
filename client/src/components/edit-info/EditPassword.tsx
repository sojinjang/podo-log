import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { PasswordInput } from "src/@types/input";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import PurpleButton from "src/components/common/PurpleButton";
import * as G from "src/styles/Common";
import * as S from "../../styles/Home";

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
      <G.InputContainer>
        <G.Input
          placeholder="old password"
          type="password"
          minLength={4}
          required
          {...register("password")}
        />
      </G.InputContainer>
      <G.InputContainer>
        <G.Input
          placeholder="new password"
          type="password"
          minLength={4}
          required
          {...register("newPassword")}
        />
      </G.InputContainer>
      <div className="w-[65%] mx-auto">
        <G.InputContainer className="w-full">
          <G.Input
            placeholder="confirm new password"
            type="password"
            minLength={4}
            required
            {...pwConfirmRegister}
          />
        </G.InputContainer>
        {errors.newPwConfirm && <S.PwConfirmMsg>{errors.newPwConfirm.message}</S.PwConfirmMsg>}
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
