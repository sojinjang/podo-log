const accessAcount = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.S3_ACCESS_KEY_PASSWORD as string,
};

export const awsS3ClientConfig = {
  region: "ap-northeast-2",
  credentials: accessAcount,
};
export const awsS3Config = {
  region: "ap-northeast-2",
  accessAcount,
};
export const bucketName = process.env.S3_BUCKET_NAME as string;
