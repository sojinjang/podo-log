import { userService } from "./user-service";
import { AsyncFunction, CreateUserDTO } from "../../types";

class UserController {
  private userService = userService;

  localJoin: AsyncFunction = async (req, res) => {
    const { email, nickname, password } = req.body;
    const profile = req.file ? req.file.location : null;

    const userDTO = { email, nickname, password, profile } as CreateUserDTO;

    const addedUser = await this.userService.localJoin(userDTO);
    return res.status(200).json(addedUser);
  };

  getById: AsyncFunction = async (req, res) => {
    const { userId } = req.params;
    const result = await this.userService.getById(userId);

    return res.status(200).json(result);
  };
}

export const userController = new UserController();
