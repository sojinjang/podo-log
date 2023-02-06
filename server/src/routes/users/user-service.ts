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
import { checkResult } from "../../utils";
import { AuthFailureError, BadRequestError } from "../../core/api-error";

class UserService {
  private userModel = userModel;
  async localJoin(userDTO: CreateUserDTO) {
    const { email, nickname, password } = userDTO;
    const exUser = await this.userModel.get({ email });
    if (exUser.length !== 0) throw new AuthFailureError("해당 이메일은 사용중입니다.");

    const hashedPassword = await bcrypt.hash(password, 10);
    userDTO.password = hashedPassword;

    const result = await this.userModel.create(userDTO);
    const messageDTO = checkResult(result, "가입에 성공하였습니다.");
    return messageDTO;
  }

  async getById(userId: number) {
    const userIdDTO: UserIdDTO = { userId };
    const [user] = await this.userModel.get(userIdDTO);
    delete user.password;
    return user;
  }

  async getMyData(userDTO: UserEntity) {
    delete userDTO.password;
    const messageDTO = { message: "내 정보 조회에 성공하였습니다.", data: userDTO };

    return messageDTO;
  }

  async getGrape(userDTO: UserEntity) {
    const userIdDTO: UserIdDTO = { userId: userDTO.userId };
    const [grain] = await this.userModel.getGrain(userIdDTO);
    const data = { ...grain, grape: userDTO.grape };

    const messageDTO = { message: "내 정보 조회에 성공하였습니다.", data };

    return messageDTO;
  }

  async pacthById(exUser: UserEntity, updateUserDTO: UpdateUserDTO) {
    const { userId, password: exHashedPassword } = exUser;
    const { password, newPassword } = updateUserDTO;

    if (password && exHashedPassword) {
      const isPasswordCorrect = await bcrypt.compare(password, exHashedPassword);
      if (!isPasswordCorrect) {
        throw new AuthFailureError("비밀번호가 일치하지 않습니다.");
      }
      if (newPassword) {
        if (password === newPassword)
          throw new BadRequestError("새로운 비밀번호와 현재 비밀번호가 같습니다.");

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        updateUserDTO.password = newHashedPassword;
        delete updateUserDTO.newPassword;
      }
    }

    const userIdDTO = { userId };
    const result = await this.userModel.pacth(userIdDTO, updateUserDTO);

    const messageDTO = checkResult(result, "회원정보 수정에 성공하였습니다.");
    return messageDTO;
  }

  async withdrawalById(userId: number) {
    const userIdDTO: UserIdDTO = { userId };
    const result = await this.userModel.withdrawalById(userIdDTO);

    const messageDTO = checkResult(result, "탈퇴에 성공하였습니다.");
    return messageDTO;
  }

  async deleteById(userDTO: UserEntity) {
    const deleteFlag = userDTO.provider === "local" && userDTO.profile !== "없음";
    if (deleteFlag) imageDeleter(userDTO.profile);
    const userIdDTO = { userId: userDTO.userId };

    const result = await this.userModel.deleteById(userIdDTO);
    const messageDTO = checkResult(result, "강한 탈퇴에 성공하였습니다. 데이터가 지워집니다.");
    return messageDTO;
  }

  async updateImage(userDTO: UserEntity, userProfileDTO: UserProfileDTO) {
    const deleteFlag = userDTO.provider === "local" && userDTO.profile !== "없음";
    if (deleteFlag) imageDeleter(userDTO.profile);

    const userIdDTO = { userId: userDTO.userId };

    const result = await this.userModel.pacth(userIdDTO, userProfileDTO);
    const messageDTO = checkResult(result, "프로필 사진을 수정하였습니다.");
    return messageDTO;
  }

  async deleteImage(userDTO: UserEntity) {
    const deleteFlag = userDTO.provider === "local" && userDTO.profile !== "없음";
    if (deleteFlag) imageDeleter(userDTO.profile);

    const userIdDTO = { userId: userDTO.userId };
    userDTO.profile = "없음";

    const result = await this.userModel.pacth(userIdDTO, userDTO);
    const messageDTO = checkResult(result, "프로필 사진을 삭제하였습니다.");
    return messageDTO;
  }
}

export const userService = new UserService();
