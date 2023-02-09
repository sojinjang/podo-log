import { Request } from "express";
import { UserEntity } from "./user-type.d";

export interface LocalLogin {
  email: string;
  password: string;
}

export interface LoggedRequest extends Request {
  user: UserEntity;
}

interface S3File extends Express.Multer.File {
  location?: string;
  key?: string;
}

export interface FileRequest extends LoggedRequest {
  file?: S3File;
}
