import { API_URL } from "src/constants/API_URL";
import { api } from "src/utils/axiosApi";
import { ACCESS_TOKEN_KEY, Token } from "src/recoil/token/atom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

export const getAccessToken = () => {
  const recoilPersist = localStorage.getItem("recoil-persist");
  if (recoilPersist) return JSON.parse(recoilPersist)[ACCESS_TOKEN_KEY];
};
export const setToken = (access_token: Token) => {
  localStorage.setItem(
    "recoil-persist",
    `{
    "${ACCESS_TOKEN_KEY}": "${access_token}"
  }`
  );
};

export const refreshToken = async () => {
  try {
    const { data } = await api.post(API_URL.refreshToken);
    setToken(data.data.accessToken);
  } catch {
    alert("로그인이 필요합니다 🪪");
    setToken(undefined);
  }
};

export const moveToDiaries = (accessToken: Token) => {
  const urlObj = new URL(window.location.href);
  urlObj.search = "";
  const rootUrl = String(urlObj).includes("#") ? String(urlObj) : String(urlObj) + "#/"; // MEMO: for gh-pages Hash Router
  if (accessToken) {
    setTimeout(() => {
      window.location.replace(rootUrl + PRIVATE_ROUTE.books.path.substring(1));
    }, 3000);
  }
};
