import { api } from "src/utils/axiosApi/api";
import { API_URL } from "src/constants/API_URL";
import { accessTokenAtom } from "src/recoil/token";
import { useSetRecoilState } from "recoil";
import * as S from "../../styles/MyPage";

const WithdrawalButton = () => {
  const setAccessToken = useSetRecoilState(accessTokenAtom);

  const handleWithdrawal = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 🥺")) return;
    try {
      await api.patch(API_URL.withdrawal, {});
      setAccessToken(undefined);
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  return (
    <S.Button className="text-[1.7vh] mx-auto" onClick={handleWithdrawal}>
      탈퇴하기
    </S.Button>
  );
};

export default WithdrawalButton;
