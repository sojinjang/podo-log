import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { InviteCodeInput } from "src/@types/input";
import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import * as S from "../../styles/MyPage";

const InviteCodeSection = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<InviteCodeInput>({ mode: "onSubmit" });
  const onSubmitCode = async ({ invttCode }: InviteCodeInput) => {
    try {
      await api.post(API_URL.inviteCodeInput, { invttCode });
      navigate(PRIVATE_ROUTE.books.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form className="w-[90%] mx-auto my-[1.5vh]" onSubmit={handleSubmit(onSubmitCode)}>
      <S.CodeSectionTitle>초대코드 입력</S.CodeSectionTitle>
      <S.CodeInputContainer className="flex">
        <input
          className="bg-transparent w-[80%]"
          placeholder="초대 코드를 입력하세요."
          minLength={8}
          maxLength={8}
          required
          {...register("invttCode")}
        />
        <S.PostButton>등록</S.PostButton>
      </S.CodeInputContainer>
    </form>
  );
};

export default InviteCodeSection;
