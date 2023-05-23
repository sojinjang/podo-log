import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { LoginInput } from "src/@types/input";
import { accessTokenAtom } from "src/recoil/token";
import { API_URL } from "src/constants/API_URL";
import PurpleButton from "../common/PurpleButton";
import { api } from "src/utils/axiosApi/api";
import * as G from "src/styles/Common";

const EmailLoginContainer = () => {
  const { register, handleSubmit } = useForm<LoginInput>({ mode: "onSubmit" });
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const logIn = async ({ email, password }: LoginInput) => {
    try {
      const { data } = await api.post(API_URL.emailLogin, { email, password });
      setAccessToken(data.data.accessToken);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(logIn)}>
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
      <PurpleButton description="Login" wrapperStyle="mt-[3vh] w-full" buttonStyle="w-[65%]" />
    </form>
  );
};

export default EmailLoginContainer;
