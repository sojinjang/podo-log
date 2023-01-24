import { userService } from "./user-service";
import { CreateUserDTO, LoggedRequest, UpdateUserDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";

class UserController {
  private userService = userService;

  localJoin = asyncHandler(async (req, res) => {
    const { email, nickname, password } = req.body;
    // const profile = req.file ? req.file.location : null;

    const createUserDTO = { email, nickname, password } as CreateUserDTO;

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
    const userId = req.user.userId;
    const result = await this.userService.deleteById(userId);

    res.status(200).json(result);
  });
}

export const userController = new UserController();
