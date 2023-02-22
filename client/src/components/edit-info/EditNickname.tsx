import React from "react";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import { patch } from "src/utils/api";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";
import PurpleButton from "src/components/common/PurpleButton";
import { Input, InputContainer } from "src/components/common/Input";

interface NicknameInput {
  readonly nickname: string;
}

const EditNickname = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm<NicknameInput>({
    mode: "onChange",
    defaultValues: {
      nickname: location.state.myInfo.nickname,
    },
  });

  const onSubmitEdit = async ({ nickname }: NicknameInput) => {
    try {
      await patch(API_URL.users, "", { nickname }, accessToken);
      navigate(PRIVATE_ROUTE.myPage.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitEdit)}>
      <InputContainer>
        <Input placeholder="nickname" minLength={2} required {...register("nickname")} />
      </InputContainer>
      <PurpleButton
        description="수정하기"
        wrapperStyle="mt-[1.5vh] w-full"
        buttonStyle="w-[65%]"
      />
    </form>
  );
};

export default EditNickname;
