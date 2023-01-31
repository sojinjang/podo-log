import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { logger } from "../utils";
import { awsS3ClientConfig, awsS3Config, bucketName } from "../config/aws-s3.config";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Request } from "express";

const s3 = new AWS.S3(awsS3Config);
const s3Client = new S3Client(awsS3ClientConfig);
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const makeKeyFromURL = (location: string) => {
  return location.split("/").slice(-2).join("/");
};

const uploadDirectory = (reqUri: string) => {
  reqUri.split("/");
};

const imageUploader = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucketName,
    key: (req: Request, file, callback) => {
      const uploadDirectory = req.query.directory ?? "default";
      const extension = path.extname(file.originalname);
      const filename = file.originalname.replace(/([^\w\.]*)/g, "");
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${filename}`);
    },
    acl: "public-read-write",
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const imageDeleter = async (location: string) => {
  let params = {
    Bucket: bucketName,
    Key: makeKeyFromURL(location),
  };
  try {
    console.log(params.Key);
    const data = await s3Client.send(new DeleteObjectCommand(params));

    logger.info(`정상 삭제 되었습니다.`);
    logger.info(data);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export { imageUploader, imageDeleter };
