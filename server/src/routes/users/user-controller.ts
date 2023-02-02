import { userService } from "./user-service";
import { CreateUserDTO, FileRequest, LoggedRequest, UpdateUserDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";
import { BadRequestError } from "../../core/api-error";

class UserController {
  private userService = userService;

  localJoin = asyncHandler(async (req: FileRequest, res) => {
    const { email, nickname, password } = req.body;
    const profile = req.file?.location;

    const createUserDTO = { email, nickname, password, profile } as CreateUserDTO;

    const messageDTO = await this.userService.localJoin(createUserDTO);

    return new SuccessResponse(messageDTO.message, {
      insertId: messageDTO.insertId,
    }).send(res);
  });

  getById = asyncHandler(async (req: LoggedRequest, res) => {
    const userData = req.user;
    delete userData.password;

    return new SuccessResponse("조회에 성공하였습니다.", {
      userData,
    }).send(res);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const { nickname, password, newPassword } = req.body;

    let updateUserDTO: UpdateUserDTO = {};
    if (req.user.provider !== "local") {
      updateUserDTO = { nickname };
    } else {
      updateUserDTO = { nickname, password, newPassword };
    }

    const messageDTO = await this.userService.pacthById(req.user, updateUserDTO);
    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  withdrawalById = asyncHandler(async (req: LoggedRequest, res) => {
    const userId = req.user.userId;
    const messageDTO = await this.userService.withdrawalById(userId);
    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  deleteById = asyncHandler(async (req: LoggedRequest, res) => {
    const messageDTO = await this.userService.deleteById(req.user);

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  updateProfile = asyncHandler(async (req: FileRequest, res) => {
    const profile = req.file?.location;
    if (!profile) throw new BadRequestError("이미지를 보내주세요.");

    const messageDTO = await this.userService.updateImage(req.user, { profile });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  deleteProfile = asyncHandler(async (req: FileRequest, res) => {
    const messageDTO = await this.userService.deleteImage(req.user);

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });
}

export const userController = new UserController();
