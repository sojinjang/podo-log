import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { API_URL } from "src/constants/API_URL";
import { api } from "src/utils/axiosApi/api";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import PurpleButton from "src/components/common/PurpleButton";
import { NicknameInput } from "src/@types/input";
import * as G from "src/styles/Common";

const EditNickname = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm<NicknameInput>({
    defaultValues: { nickname: location.state.myInfo.nickname },
  });

  const onSubmitEdit = async ({ nickname }: NicknameInput) => {
    try {
      await api.patch(API_URL.users, { nickname });
      navigate(PRIVATE_ROUTE.myPage.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <G.InputContainer>
        <G.Input placeholder="nickname" minLength={2} required {...register("nickname")} />
      </G.InputContainer>
      <PurpleButton
        description="수정하기"
        wrapperStyle="mt-[1.5vh] w-full"
        buttonStyle="w-[65%]"
      />
    </form>
  );
};

export default EditNickname;
