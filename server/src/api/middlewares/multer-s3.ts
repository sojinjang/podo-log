import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { logger } from "../../utils";
import { s3Client, bucketName } from "../../config/aws-s3.config";
import { DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { Request } from "express";
import { BadRequestError } from "../../core/api-error";

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".gif", ".webp"];

interface Callback {
  (error: any, key?: string | undefined): void;
}

const uploaderKeySwitch = (req: Request, file: Express.Multer.File, callback: Callback) => {
  const isPackage = file.fieldname === "package";
  const uploadDirectory = file.fieldname ?? "default";
  const extension = path.extname(file.originalname).toLowerCase();
  const filename = file.originalname.replace(/([^\w\.])/g, "");
  if (!allowedExtensions.includes(extension)) {
    return callback(new BadRequestError("사용 가능한 이미지 파일이 아닙니다."));
  }

  const key = `${uploadDirectory}/${isPackage ? "" : Date.now() + "_"}${filename}`;
  callback(null, key);
};

const fileSize = (fieldname?: string) => {
  return { fileSize: fieldname === "package" ? 20 * 1024 * 1024 : 10 * 1024 * 1024 };
};

const imageUploader = (fieldname?: string) => {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: bucketName,
      key: uploaderKeySwitch,
      acl: "public-read-write",
    }),
    limits: fileSize(fieldname),
  });
};

const imageDeleter = async (key: string) => {
  let params = {
    Bucket: bucketName,
    Key: key,
  };
  try {
    console.log(params.Key);
    const data = await s3Client.send(new DeleteObjectCommand(params));

    logger.info(`정상 삭제 되었습니다.`);
    logger.info(data);
  } catch (err) {
    logger.error(err);
    throw new BadRequestError("이미지 삭제에 실패하였습니다.");
  }
};

const imageObjDeleter = async (Objects: { Key: string }[]) => {
  let params = {
    Bucket: bucketName,
    Delete: { Objects },
  };
  try {
    const data = await s3Client.send(new DeleteObjectsCommand(params));
    logger.info(`정상 삭제 되었습니다.`);
    logger.info(data);
  } catch (err) {
    logger.error(err);
    throw new BadRequestError("이미지 삭제에 실패하였습니다.");
  }
};

export { imageUploader, imageDeleter, imageObjDeleter };
