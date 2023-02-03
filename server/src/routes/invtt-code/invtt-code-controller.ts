import { invttCodeService } from "./invtt-code-service";
import { LoggedRequest, UserBookDTO, UserIdDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";

class InvttCodeController {
  private invttCodeService = invttCodeService;

  joinBook = asyncHandler(async (req: LoggedRequest, res) => {
    const userIdDTO: UserIdDTO = { userId: req.user.userId };
    const invttCodeDTO = { invttCode: req.body.invttCode };

    const messageDTO = await this.invttCodeService.joinBook(userIdDTO, invttCodeDTO);

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  patchInvttCode = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

    const messageDTO = await this.invttCodeService.patchInvttCode(userBookDTO);

    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getInvttCode = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

    const messageDTO = await this.invttCodeService.getInvttCode(userBookDTO);

    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });
}

export const invttCodeController = new InvttCodeController();
