export interface UserEntity {
  userId: number;
  email: string;
  password: string;
  nickname: string;
  profile?: string;
  role: "admin" | "user";
  grape: number;
}

export interface CreateUserDTO extends UserEntity {
  userId: undefined;
  role: undefined;
  grape: undefined;
}

export interface userIdDTO {
  userId: number;
}
