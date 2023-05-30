export interface BookNameInput {
  readonly bookName: string;
}

export interface NicknameInput {
  readonly nickname: string;
}

export interface SignUpInput extends NicknameInput {
  readonly email: string;
  readonly password: string;
  readonly pwConfirm?: string | undefined;
}

export type LoginInput = Pick<SignUpInput, "email" | "password">;

export type PasswordInput = Pick<SignUpInput, "password"> & {
  readonly newPassword: string;
  readonly newPwConfirm?: string;
};

export interface DiaryInput {
  readonly title: string;
  readonly content: string;
}

export interface DiaryOgInput extends DiaryInput {
  readonly picture: string;
}

export interface InviteCodeInput {
  readonly invttCode: string;
}
