import { userModel } from "../../db/models";
import bcrypt from "bcrypt";
import { CreateUserDTO, UpdateUserDTO, UserIdDTO } from "../../types";
// const { imageDeleter } = require("../middlewares");

class UserService {
  private userModel = userModel;
  async localJoin(userDTO: CreateUserDTO) {
    const { email, nickname, password } = userDTO;
    const exUser = await this.userModel.get({ email });
    if (exUser.length !== 0) throw new Error("403, 해당 이메일은 사용중입니다.");

    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;

    const result = await this.userModel.create(userDTO);
    return result;
  }

  async getById(userId: number) {
    const userIdDTO: UserIdDTO = { userId };
    const result = await this.userModel.get(userIdDTO);
    return result;
  }

  async pacthById(userId: number, updateUserDTO: UpdateUserDTO) {
    const userIdDTO: UserIdDTO = { userId };
    const result = await this.userModel.pacthById(userIdDTO, updateUserDTO);
    return result;
  }

  async withdrawalById(userId: number) {
    const userIdDTO: UserIdDTO = { userId };
    const result = await this.userModel.withdrawalById(userIdDTO);
    return result;
  }

  async deleteById(userId: number) {
    const userIdDTO: UserIdDTO = { userId };
    const result = await this.userModel.deleteById(userIdDTO);
    return result;
  }
}

export const userService = new UserService();
