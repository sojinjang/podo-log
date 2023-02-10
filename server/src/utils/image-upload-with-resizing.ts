import sharp from "sharp";
import { bucketName, packageExtension, s3Client } from "../config";
import { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { logger } from "./pino";

interface ImgConfig {
  Bucket: string;
  Key: string;
  Body?: Buffer;
  ACL?: string;
}

export const compressImageUploadByKey = async (
  key: string,
  packageName: string,
  width: number = 150
) => {
  try {
    const [_, stickerName, extension] = key.split(/[\.\/]/g);
    const compressedKey = `packages/${packageName}/${stickerName}.${packageExtension}`;
    logger.info(compressedKey);
    const exImgConfig = {
      Bucket: bucketName,
      Key: key,
    };

    let resizedImgConfig: ImgConfig = {
      Bucket: bucketName,
      Key: compressedKey,
      ACL: "public-read-write",
    };

    const { Body } = await s3Client.send(new GetObjectCommand(exImgConfig));
    if (typeof Body === "undefined") return;
    const exImg = await Body.transformToByteArray();

    const imageBuffer = await sharp(exImg)
      .resize({ width, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .withMetadata()
      .toFormat(packageExtension, { quality: 80 })
      .toBuffer();
    resizedImgConfig.Body = imageBuffer;

    await s3Client.send(new PutObjectCommand(resizedImgConfig));

    await s3Client.send(new DeleteObjectCommand(exImgConfig));

    return { stickerName, stickerImg: compressedKey };
  } catch (error) {
    throw error;
  }
};
