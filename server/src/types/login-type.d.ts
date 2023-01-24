import { Request } from "express";

export interface LocalLogin {
  email: string;
  password: string;
}

export interface LoggedRequest extends Request {
  user?: UserEntity;
}
