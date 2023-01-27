import { commentService } from "./comment-service";
import { CreateCommentDTO, LoggedRequest, UpdateCommentDTO } from "../../types";
import asyncHandler from "../../utils/async-handler";

class CommentController {
  private commentService = commentService;

  create = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const diaryId = parseInt(req.body.diaryId);
    const parentCommentId = parseInt(req.body.parentCommentId);
    const { reply } = req.body;

    const createDiaryDTO = { userId, diaryId, parentCommentId, reply } as CreateCommentDTO;

    const result = await this.commentService.create(createDiaryDTO);
    res.status(200).json(result);
  });

  // getByBookId = asyncHandler(async (req: LoggedRequest, res) => {
  //   const bookId = parseInt(req.params.bookId);
  //   const limit = parseInt(req.query.limit as string) || 10;
  //   const offset = parseInt(req.query.offset as string) || 0;

  //   const bookIdDTO: GetDiaryDTO = { bookId };
  //   const pageDTO: PageDTO = { limit, offset };
  //   const result = await this.diaryService.getByBookId(bookIdDTO, pageDTO);
  //   res.status(200).json(result);
  // });

  pacthById = asyncHandler(async (req: LoggedRequest, res) => {
    const { userId } = req.user;
    const commentId = parseInt(req.params.commentId);
    const { reply } = req.body;

    let updateCommentDTO: UpdateCommentDTO = { reply };

    const result = await this.commentService.pacthById({ commentId }, updateCommentDTO, {
      userId,
    });
    res.status(200).json(result);
  });

  // deleteById = asyncHandler(async (req: LoggedRequest, res) => {
  //   const diaryId = parseInt(req.params.diaryId);
  //   const { userId } = req.user;

  //   const result = await this.diaryService.deleteById({ diaryId }, { userId });

  //   res.status(200).json(result);
  // });
}

export const commentController = new CommentController();
