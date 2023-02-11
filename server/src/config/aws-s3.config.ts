import { S3Client } from "@aws-sdk/client-s3";

const accessAcount = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.S3_ACCESS_KEY_PASSWORD as string,
};

const awsS3ClientConfig = {
  region: "ap-northeast-2",
  credentials: accessAcount,
};

export const bucketName = process.env.S3_BUCKET_NAME as string;

export const s3Client = new S3Client(awsS3ClientConfig);

export const packageExtension = "png";
