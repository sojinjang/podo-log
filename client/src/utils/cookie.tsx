const setCookie = (key: string, value: string, maxAge = 3600) => {
  document.cookie = key + "=" + JSON.stringify(value) + `; max-age=${maxAge}; path=/;`;
};

const getCookieValue = (key: string) => {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + key.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
};

const deleteCookie = (key: string) => {
  setCookie(key, "", -1);
};

export { setCookie, getCookieValue, deleteCookie };
