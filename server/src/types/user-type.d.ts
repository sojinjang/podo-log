export interface UserEntity {
  userId: number;
  email?: string;
  password?: string;
  nickname: string;
  profile: string;
  role: "admin" | "user";
  grape: number;
  snsId: string;
  provider: Provider;
}
export type Provider = "kakao" | "naver" | "podo";

export interface UserIdDTO {
  userId: number;
}
export interface UserProfileDTO {
  profile: string;
}

export interface GetUserDTO {
  userId?: number;
  email?: string;
  nickname?: string;
  role?: "admin" | "user";
  grape?: number;
  snsId?: string;
  provider?: Provider;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  nickname: string;
  profile?: Provider;
}

export interface SNSCreateUserDTO {
  userId?: number;
  email?: string;
  password?: string;
  nickname?: string;
  profile?: string;
  snsId: string;
  provider: Provider;
}

export interface UpdateUserDTO {
  nickname?: string;
  password?: string;
  newPassword?: string;
  profile?: string;
}
export interface WithdrawalUserDTO {
  password?: string;
  nickname?: string;
}
