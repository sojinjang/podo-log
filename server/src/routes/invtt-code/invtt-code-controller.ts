import { invttCodeService } from "./invtt-code-service";
import { LoggedRequest, UserBookDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";

class InvttCodeController {
  private invttCodeService = invttCodeService;

  createInvttCode = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

    const result = await this.invttCodeService.createInvttCode(userBookDTO);

    return res.status(200).json(result);
  });

  getInvttCode = asyncHandler(async (req: LoggedRequest, res) => {
    const bookId = parseInt(req.params.bookId);
    const userBookDTO: UserBookDTO = { userId: req.user.userId, bookId };

    const result = await this.invttCodeService.getInvttCode(userBookDTO);

    return res.status(200).json(result);
  });
}

export const invttCodeController = new InvttCodeController();
