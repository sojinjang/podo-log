import { commentModel } from "../../db/models";
import { CommentIdDTO, CreateCommentDTO, UpdateCommentDTO, UserIdDTO } from "../../types";

class CommentService {
  private commentModel = commentModel;
  async create(commentDTO: CreateCommentDTO) {
    const result = await this.commentModel.create(commentDTO);
    return result;
  }

  // async getByBookId(bookIdDTO: GetcommentDTO, pageDTO: PageDTO) {
  //   const diaries = await this.commentModel.getWithUser(bookIdDTO, pageDTO);
  //   return diaries;
  // }

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

  // async deleteById(diaryIdDTO: DiaryIdDTO, userIdDTO: UserIdDTO) {
  //   const [diary] = await this.commentModel.get(diaryIdDTO);
  //   if (!diary)
  //     throw new Error(
  //       `Forbidden,
  //         404,
  //         "요청한 다이어리가 존재하지 않습니다."`
  //     );
  //   if (diary.userId !== userIdDTO.userId) {
  //     throw new Error(
  //       `Forbidden,
  //           403,
  //           "작성자가 아니라 권한이 없습니다."`
  //     );
  //   }
  //   const result = await this.commentModel.deleteById(diaryIdDTO);
  //   return result;
  // }
}

export const commentService = new CommentService();
