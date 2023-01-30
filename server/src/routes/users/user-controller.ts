import { userService } from "./user-service";
import { CreateUserDTO, FileRequest, LoggedRequest, UpdateUserDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";

class UserController {
  private userService = userService;

  localJoin = asyncHandler(async (req: FileRequest, res) => {
    const { email, nickname, password } = req.body;
    const profile = req.file?.location;

    const createUserDTO = { email, nickname, password, profile } as CreateUserDTO;

    const addedUser = await this.userService.localJoin(createUserDTO);

    res.status(200).json(addedUser);
  });

  getById = asyncHandler(async (req: LoggedRequest, res) => {
    const result = req.user;
    delete result.password;
    res.status(200).json(result);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const { nickname, password, newPassword } = req.body;

    let updateUserDTO: UpdateUserDTO = {};
    if (req.user.provider !== "local") {
      updateUserDTO = { nickname };
    } else {
      updateUserDTO = { nickname, password, newPassword };
    }

    const result = await this.userService.pacthById(req.user, updateUserDTO);
    res.status(200).json(result);
  });

  withdrawalById = asyncHandler(async (req: LoggedRequest, res) => {
    const userId = req.user.userId;
    const result = await this.userService.withdrawalById(userId);
    return res.status(200).json(result);
  });

  deleteById = asyncHandler(async (req: LoggedRequest, res) => {
    const result = await this.userService.deleteById(req.user);

    res.status(200).json(result);
  });

  updateProfile = asyncHandler(async (req: FileRequest, res) => {
    const profile = req.file?.location;
    if (!profile) throw new Error("요청 오류, 이미지 없음");

    const result = await this.userService.updateImage(req.user, { profile });

    res.status(200).json(result);
  });

  deleteProfile = asyncHandler(async (req: FileRequest, res) => {
    const result = await this.userService.deleteImage(req.user);

    res.status(200).json(result);
  });
}

export const userController = new UserController();
