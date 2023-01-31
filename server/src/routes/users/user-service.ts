import { userModel } from "../../db/models";
import bcrypt from "bcrypt";
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserEntity,
  UserIdDTO,
  UserProfileDTO,
} from "../../types";
import { imageDeleter } from "../../middlewares";

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
    const [user] = await this.userModel.get(userIdDTO);
    delete user.password;
    return user;
  }

  async pacthById(exUser: UserEntity, updateUserDTO: UpdateUserDTO) {
    const { userId, password: exHashedPassword } = exUser;
    const { password, newPassword } = updateUserDTO;

    if (password && exHashedPassword) {
      const isPasswordCorrect = await bcrypt.compare(password, exHashedPassword);
      if (!isPasswordCorrect) {
        throw new Error(
          `UNAUTHORIZED,
            401,
            "비밀번호가 일치하지 않습니다."`
        );
      }
      if (newPassword) {
        if (password === newPassword)
          throw new Error("400, 새로운 비밀번호와 현재 비밀번호가 같습니다.");

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        updateUserDTO.password = newHashedPassword;
        delete updateUserDTO.newPassword;
      }
    }

    const userIdDTO = { userId };
    const result = await this.userModel.pacth(userIdDTO, updateUserDTO);
    return result;
  }

  async withdrawalById(userId: number) {
    const userIdDTO: UserIdDTO = { userId };
    const result = await this.userModel.withdrawalById(userIdDTO);
    return result;
  }

  async deleteById(userDTO: UserEntity) {
    const deleteFlag = userDTO.provider === "local" && userDTO.profile !== "없음";
    if (deleteFlag) imageDeleter(userDTO.profile);
    const userIdDTO = { userId: userDTO.userId };

    const result = await this.userModel.deleteById(userIdDTO);
    return result;
  }

  async updateImage(userDTO: UserEntity, userProfileDTO: UserProfileDTO) {
    const deleteFlag = userDTO.provider === "local" && userDTO.profile !== "없음";
    if (deleteFlag) imageDeleter(userDTO.profile);

    const userIdDTO = { userId: userDTO.userId };

    const result = await this.userModel.pacth(userIdDTO, userProfileDTO);
    return result;
  }

  async deleteImage(userDTO: UserEntity) {
    const deleteFlag = userDTO.provider === "local" && userDTO.profile !== "없음";
    if (deleteFlag) imageDeleter(userDTO.profile);

    const userIdDTO = { userId: userDTO.userId };
    userDTO.profile = "없음";

    const result = await this.userModel.pacth(userIdDTO, userDTO);
    return result;
  }
}

export const userService = new UserService();
