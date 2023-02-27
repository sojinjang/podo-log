import { API_URL } from "src/constants/API_URL";
import { post } from "./api";
import { Token } from "src/recoil/token/atom";
import { PRIVATE_ROUTE } from "src/router/ROUTE_INFO";

export const refreshToken = async (setAccessToken: (arg: Token) => void) => {
  try {
    const response = await post(API_URL.refreshToken);
    setAccessToken(response.data.accessToken);
  } catch {
    alert("로그인이 필요합니다 🪪");
    setAccessToken(undefined);
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
