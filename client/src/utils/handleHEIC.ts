import heic2any from "heic2any";

export const isHEICFile = (file: File): boolean => {
  return file.type === "image/heic" || file.type === "image/HEIC";
};

export const convertHEICToJPG = async (file: File) => {
  const jpgBlob = await heic2any({ blob: file, toType: "image/jpeg" });
  return new File([jpgBlob as BlobPart], file.name.split(".")[0] + ".jpg");
};
