export const isHEICFile = (file: File): boolean => {
  return file.type === "image/heic" || file.type === "image/HEIC";
};

export const convertHEICToJPG = async (file: File) => {
  const heic2any = await import("heic2any");
  const jpgBlob = await heic2any.default({ blob: file, toType: "image/jpeg" });

  return new File([jpgBlob as BlobPart], file.name.split(".")[0] + ".jpg", {
    type: "image/jpeg",
  });
};
