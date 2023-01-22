export interface UserEntity {
  userId: number;
  email: string;
  password: string;
  nickname: string;
  profile?: string;
  role: "admin" | "user";
  grape: number;
}

export interface UserIdDTO {
  userId: number;
}

export interface GetUserDTO {
  userId?: number;
  email?: string;
  password?: string;
  nickname?: string;
}
export interface CreateUserDTO {
  email: string;
  password: string;
  nickname: string;
  profile?: string;
}
export interface UpdateUserDTO {
  nickname?: string;
  password?: string;
  newPassword?: string;
}
export interface WithdrawalUserDTO {
  password?: string;
  nickname?: string;
}
