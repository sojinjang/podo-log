export interface UserEntity {
  userId: number;
  email: string;
  password: string;
  nickname: string;
  profile?: string;
  role: "admin" | "user";
  grape: number;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  nickname: string;
  profile?: string;
}

export interface userIdDTO {
  userId: number;
}
