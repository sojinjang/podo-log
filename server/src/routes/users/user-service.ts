import { userModel } from "../../db/models";
import bcrypt from "bcrypt";
import { CreateUserDTO, userIdDTO } from "../../types";
// const { imageDeleter } = require("../middlewares");

class UserService {
  private userModel = userModel;
  async localJoin(userDTO: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;

    const result = await this.userModel.create(userDTO);
    return result;
  }

  async getById(userId: number) {
    const userIdDTO: userIdDTO = { userId };
    const result = await this.userModel.get(userIdDTO);
    return result;
  }
}

export const userService = new UserService();
