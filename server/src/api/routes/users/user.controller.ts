import { UserService } from "../../../services";
import { CreateUserDTO, FileRequest, LoggedRequest, UpdateUserDTO } from "../../../types";
import asyncHandler from "../../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../../core/api-response";
import { BadRequestError } from "../../../core/api-error";
import { Service } from "typedi";

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  localJoin = asyncHandler(async (req: FileRequest, res) => {
    const { email, nickname, password } = req.body;
    const profile = req.file?.key;

    const createUserDTO = { email, nickname, password, profile } as CreateUserDTO;

    const messageDTO = await this.userService.localJoin(createUserDTO);

    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getMyData = asyncHandler(async (req: LoggedRequest, res) => {
    const userDTO = req.user;
    const messageDTO = await this.userService.getMyData(userDTO);

    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getGrape = asyncHandler(async (req: LoggedRequest, res) => {
    const userDTO = req.user;
    const messageDTO = await this.userService.getGrape(userDTO);

    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const { nickname, password, newPassword } = req.body;

    let updateUserDTO: UpdateUserDTO = {};
    if (req.user.provider !== "podo") {
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
    const profile = req.file?.key;
    if (!profile) throw new BadRequestError("이미지를 보내주세요.");

    const messageDTO = await this.userService.updateImage(req.user, { profile });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  deleteProfile = asyncHandler(async (req: FileRequest, res) => {
    const messageDTO = await this.userService.deleteImage(req.user);

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });
}
