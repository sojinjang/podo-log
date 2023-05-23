import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTE } from "src/router/ROUTE_INFO";
import * as S from "src/styles/Home";

const SignUpButton = () => {
  const navigate = useNavigate();
  const onClickSignUp = () => {
    navigate(PUBLIC_ROUTE.signUp.path);
  };
  return <S.SignUpPhrase onClick={onClickSignUp}>Sign Up</S.SignUpPhrase>;
};

export default SignUpButton;
