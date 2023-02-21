import React from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { post } from "src/utils/api";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { useRecoilValue } from "recoil";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

interface InviteCodeInput {
  readonly invttCode: string;
}

export const InviteCodeSection = () => {
  const accessToken = useRecoilValue(accessTokenAtom);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<InviteCodeInput>({
    mode: "onChange",
  });
  const onSubmitCode = async ({ invttCode }: InviteCodeInput) => {
    try {
      await post(API_URL.inviteCodeInput, { invttCode }, accessToken);
      navigate(PRIVATE_ROUTE.books.path);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <form className="w-[90%] mx-auto my-[1.5vh]" onSubmit={handleSubmit(onSubmitCode)}>
      <CodeSectionTitle>초대코드 입력</CodeSectionTitle>
      <CodeInputContainer className="flex">
        <input
          className="bg-transparent w-[80%]"
          placeholder="초대 코드를 입력하세요."
          minLength={8}
          maxLength={8}
          required
          {...register("invttCode")}
        />
        <PostButton>등록</PostButton>
      </CodeInputContainer>
    </form>
  );
};

const CodeSectionTitle = tw.p`
font-sans text-[1.5vh] text-[#959595]
`;

const CodeInputContainer = tw.div`
font-sans text-[1.5vh] bg-white/60 rounded-lg shadow-lg
mx-auto md:p-5 p-3
`;

const PostButton = tw.button` 
font-sans w-[10%] ml-auto cursor-pointer text-center
text-purple-1000 hover:opacity-50 ease-in duration-300
`;
