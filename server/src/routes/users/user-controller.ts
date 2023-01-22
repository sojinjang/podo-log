import { userService } from "./user-service";
import { CreateUserDTO, UpdateUserDTO } from "../../types";
import { AsyncFunction } from "../../utils";

class UserController {
  private userService = userService;

  localJoin: AsyncFunction = async (req, res) => {
    const { email, nickname, password } = req.body;
    // const profile = req.file ? req.file.location : null;

    const createUserDTO = { email, nickname, password } as CreateUserDTO;

    const addedUser = await this.userService.localJoin(createUserDTO);
    return res.status(200).json(addedUser);
  };

  getById: AsyncFunction = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const result = await this.userService.getById(userId);

    return res.status(200).json(result);
  };

  pacthById: AsyncFunction = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { nickname, password, newPassword } = req.body;

    if (password && newPassword) {
      if (password === newPassword)
        throw new Error("400, 새로운 비밀번호와 현재 비밀번호가 같습니다.");
    }
    const updateUserDTO = { nickname, password, newPassword } as UpdateUserDTO;
    const result = await this.userService.pacthById(userId, updateUserDTO);
    return res.status(200).json(result);
  };

  withdrawalById: AsyncFunction = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const result = await this.userService.withdrawalById(userId);
    return res.status(200).json(result);
  };

  deleteById: AsyncFunction = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const result = await this.userService.deleteById(userId);
    return res.status(200).json(result);
  };
}

export const userController = new UserController();
