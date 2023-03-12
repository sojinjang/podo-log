import jwt from "jsonwebtoken";
import { accessTokenConfig, refreshTokenConfig } from "../config";
import { InternalError } from "../core/api-error";
import { TokenConfig } from "../types";
import { logger } from "./pino";

abstract class Token {
  constructor(public data: any, public kind: TokenConfig) {}
  public make() {
    try {
      return jwt.sign(this.data, this.kind.secretKey, {
        expiresIn: this.kind.time,
      });
    } catch (error) {
      logger.error(error);
      throw new InternalError("재시도 해주세요");
    }
  }
}

export class AccessToken extends Token {
  constructor(data: any) {
    super(data, accessTokenConfig);
  }
}
export class RefreshToken extends Token {
  constructor(data: any) {
    super(data, refreshTokenConfig);
  }
}
