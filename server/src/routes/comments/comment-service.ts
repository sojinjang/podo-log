import { commentModel } from "../../db/models";
import {
  CommentIdDTO,
  CreateCommentDTO,
  GetCommentDTO,
  UpdateCommentDTO,
  UserIdDTO,
} from "../../types";
import { checkResult } from "../../utils";
import { ForbiddenError, NoDataError } from "./../../core/api-error";

class CommentService {
  private commentModel = commentModel;
  async create(commentDTO: CreateCommentDTO) {
    const result = await this.commentModel.create(commentDTO);
    const messageDTO = checkResult(result, "댓글 생성에 성공하였습니다.");
    return messageDTO;
  }

  async getByDiaryId(diaryIdDTO: GetCommentDTO) {
    const comments = await this.commentModel.get(diaryIdDTO);

    const messageDTO = { message: "댓글 조회에 성공하였습니다.", data: comments };

    return messageDTO;
  }

  async pacthById(
    commentIdDTO: CommentIdDTO,
    updateCommentDTO: UpdateCommentDTO,
    userIdDTO: UserIdDTO
  ) {
    const [comment] = await this.commentModel.get(commentIdDTO);
    if (!comment) throw new NoDataError("요청한 댓글이 존재하지 않습니다.");
    if (comment.userId !== userIdDTO.userId)
      throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

    const result = await this.commentModel.pacth(commentIdDTO, updateCommentDTO);

    const messageDTO = checkResult(result, "댓글 수정에 성공하였습니다.");
    return messageDTO;
  }

  async deleteById(commentIdDTO: CommentIdDTO, userIdDTO: UserIdDTO) {
    const [comment] = await this.commentModel.get(commentIdDTO);
    if (!comment) throw new NoDataError("요청한 댓글이 존재하지 않습니다.");
    if (comment.userId !== userIdDTO.userId)
      throw new ForbiddenError("작성자가 아니라 권한이 없습니다.");

    const result = await this.commentModel.deleteById(commentIdDTO);

    const messageDTO = checkResult(result, "댓글 삭제에 성공하였습니다.");
    return messageDTO;
  }
}

export const commentService = new CommentService();
