import { Response } from "express";
import { podologURL } from "../config";

enum StatusCode {
  SUCCESS = "10000",
  FAILURE = "10001",
  RETRY = "10002",
  INVALID_ACCESS_TOKEN = "10003",
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string }
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }

  protected static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = "Authentication Failure") {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = "Not Found") {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = "Forbidden") {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string = "성공입니다.", private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = "refresh_token";

  constructor(message = "Access token invalid") {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}

// passport 의 res.cookie 의존
interface SetCookie {
  refreshToken?: string;
  option?: any;
}
export class SuccessLoginResponseWithCookie<T> extends ApiResponse {
  constructor(message: string, private data: T, private setCookie: SetCookie = {}) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepareWithCookie<SuccessLoginResponseWithCookie<T>>(res, this, headers);
  }

  protected prepareWithCookie<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string }
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);

    const noCookieRes = { ...response };
    // @ts-ignore
    delete noCookieRes.setCookie;
    return res
      .status(this.status)
      .cookie("refreshToken", this.setCookie.refreshToken, this.setCookie.option)
      .json(ApiResponse.sanitize(noCookieRes));
  }
}

export class SuccessLogoutResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepareWithClearCookie<SuccessLogoutResponse>(res, this, headers);
  }

  prepareWithClearCookie<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string }
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    return res
      .status(this.status)
      .clearCookie("refreshToken")
      .json(ApiResponse.sanitize(response));
  }
}

export class FailureLoginRedirect extends ApiResponse {
  constructor(message: string, private redirectUrl: string = podologURL) {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }

  redirect(res: Response, headers: { [key: string]: string } = {}): void {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    const redirectUrlQuery = `${this.redirectUrl}?loginError=${this.message}`;
    return res.status(this.status).redirect(redirectUrlQuery);
  }
}

export class SuccessLoginRedirectWithCookie extends ApiResponse {
  constructor(
    message: string,
    private setCookie: SetCookie = {},
    private redirectUrl: string = podologURL
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  redirectWithCookie(res: Response, headers: { [key: string]: string } = {}): void {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);

    const redirectUrlQuery = `${this.redirectUrl}?snslogin=${this.message}`;

    return res
      .status(this.status)
      .cookie("refreshToken", this.setCookie.refreshToken, this.setCookie.option)
      .redirect(redirectUrlQuery);
  }
}
