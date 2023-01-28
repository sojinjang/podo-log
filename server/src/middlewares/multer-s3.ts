import AWS from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { logger } from "../utils";
import { awsS3ClientConfig, awsS3Config, bucketName } from "../config/aws-s3.config";
import { S3Client } from "@aws-sdk/client-s3";
import { Request } from "express";

const s3 = new AWS.S3(awsS3Config);
const s3Client = new S3Client(awsS3ClientConfig);
const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const uploadDirectory = () => {};

const imageUploader = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucketName,
    key: (req: Request, file, callback) => {
      const uploadDirectory = req.query.directory ?? "default";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: "public-read-write",
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const imageDeleter = (location: string) => {
  let params = {
    Bucket: bucketName,
    Key: location.split("/").slice(-2).join("/"),
  };

  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
        logger.error("err: ", error, error.stack);
      } else {
        logger.info(" 정상 삭제 되었습니다.");
      }
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export { imageUploader, imageDeleter };
