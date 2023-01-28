import { commentModel } from "../../db/models";
import {
  CommentIdDTO,
  CreateCommentDTO,
  GetCommentDTO,
  UpdateCommentDTO,
  UserIdDTO,
} from "../../types";

class CommentService {
  private commentModel = commentModel;
  async create(commentDTO: CreateCommentDTO) {
    const result = await this.commentModel.create(commentDTO);
    return result;
  }

  async getByDiaryId(diaryIdDTO: GetCommentDTO) {
    const diaries = await this.commentModel.get(diaryIdDTO);
    return diaries;
  }

  async pacthById(
    commentIdDTO: CommentIdDTO,
    updateCommentDTO: UpdateCommentDTO,
    userIdDTO: UserIdDTO
  ) {
    const [comment] = await this.commentModel.get(commentIdDTO);
    if (!comment)
      throw new Error(
        `Forbidden,
          404,
          "요청한 다이어리가 존재하지 않습니다."`
      );
    if (comment.userId !== userIdDTO.userId) {
      throw new Error(
        `Forbidden,
            403,
            "작성자가 아니라 권한이 없습니다."`
      );
    }

    const result = await this.commentModel.pacth(commentIdDTO, updateCommentDTO);
    return result;
  }

  async deleteById(commentIdDTO: CommentIdDTO, userIdDTO: UserIdDTO) {
    const [comment] = await this.commentModel.get(commentIdDTO);
    if (!comment)
      throw new Error(
        `Forbidden,
          404,
          "요청한 다이어리가 존재하지 않습니다."`
      );
    if (comment.userId !== userIdDTO.userId) {
      throw new Error(
        `Forbidden,
            403,
            "작성자가 아니라 권한이 없습니다."`
      );
    }
    const result = await this.commentModel.deleteById(commentIdDTO);
    return result;
  }
}

export const commentService = new CommentService();
