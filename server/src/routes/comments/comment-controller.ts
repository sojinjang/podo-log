import { commentService } from "./comment-service";
import { CreateCommentDTO, DiaryIdDTO, LoggedRequest, UpdateCommentDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";

class CommentController {
  private commentService = commentService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const diaryId = parseInt(req.body.diaryId);
    const parentCommentId = parseInt(req.body.parentCommentId) || 0;
    const { reply } = req.body;

    const createDiaryDTO = { userId, diaryId, parentCommentId, reply } as CreateCommentDTO;

    const result = await this.commentService.create(createDiaryDTO);
    return res.status(200).json(result);
  });

  getByDiaryId = asyncHandler(async (req: LoggedRequest, res) => {
    const diaryId = parseInt(req.query.diaryId as string);

    const diaryIdDTO: DiaryIdDTO = { diaryId };
    const result = await this.commentService.getByDiaryId(diaryIdDTO);
    return res.status(200).json(result);
  });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const commentId = parseInt(req.params.commentId);
    const { reply } = req.body;

    let updateCommentDTO: UpdateCommentDTO = { reply };

    const result = await this.commentService.pacthById({ commentId }, updateCommentDTO, {
      userId,
    });
    return res.status(200).json(result);
  });

  deleteById = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const commentId = parseInt(req.params.commentId);

    const result = await this.commentService.deleteById({ commentId }, { userId });

    return res.status(200).json(result);
  });
}

export const commentController = new CommentController();
