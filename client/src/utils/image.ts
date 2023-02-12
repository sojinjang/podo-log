export const convertURLtoFile = async (url: string) => {
  const CORS_ANYWHERE_URL = "https://cors-anywhere.herokuapp.com/";
  const slicedUrl = url.split("//")[1];
  const response = await fetch(CORS_ANYWHERE_URL + slicedUrl);
  const data = await response.blob();
  const extension = url.split(".").pop();
  const filename = url.split("/").pop();
  const metadata = { type: `image/${extension}` };

  return new File([data], String(filename), metadata);
};
