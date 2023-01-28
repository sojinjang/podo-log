export interface CommentEntity {
  commentId: number;
  diaryId: number;
  userId: number;
  parentCommentId?: number;
  reply: string;
}

export interface CommentIdDTO {
  commentId: number;
}

export interface CreateCommentDTO {
  diaryId: number;
  userId: number;
  parentCommentId?: number;
  reply: string;
}

export interface GetCommentDTO {
  commentId?: number;
  diaryId?: number;
  userId?: number;
  parentCommentId?: number;
}

export interface UpdateCommentDTO {
  reply: string;
}
