import imageCompression from "browser-image-compression";

export const compressImg = async (image: File) => {
  const options = {
    maxSizeMb: 1,
    maxWidthOrHeight: 1200,
  };
  try {
    const blob = await imageCompression(image, options);
    return new File([blob], blob.name);
  } catch (err) {
    if (err instanceof Error) alert(err.message);
  }
};
