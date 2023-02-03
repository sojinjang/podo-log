import { commentService } from "./comment-service";
import { CreateCommentDTO, DiaryIdDTO, LoggedRequest, UpdateCommentDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";
import { SuccessMsgResponse, SuccessResponse } from "../../core/api-response";

class CommentController {
  private commentService = commentService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const diaryId = parseInt(req.body.diaryId);
    const parentCommentId = parseInt(req.body.parentCommentId) || 0;
    const { reply } = req.body;

    const createDiaryDTO = { userId, diaryId, parentCommentId, reply } as CreateCommentDTO;

    const messageDTO = await this.commentService.create(createDiaryDTO);
    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  getByDiaryId = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.query.diaryId as string);

    const diaryIdDTO: DiaryIdDTO = { diaryId };
    const messageDTO = await this.commentService.getByDiaryId(diaryIdDTO);

    return new SuccessResponse(messageDTO.message, messageDTO.data).send(res);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const commentId = parseInt(req.params.commentId);
    const { reply } = req.body;

    let updateCommentDTO: UpdateCommentDTO = { reply };

    const messageDTO = await this.commentService.pacthById({ commentId }, updateCommentDTO, {
      userId,
    });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });

  deleteById = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const commentId = parseInt(req.params.commentId);

    const messageDTO = await this.commentService.deleteById({ commentId }, { userId });

    return new SuccessMsgResponse(messageDTO.message).send(res);
  });
}

export const commentController = new CommentController();
