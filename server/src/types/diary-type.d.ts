export interface DiaryEntity {
  diaryId: number;
  bookId: number;
  userId: number;
  picture?: string;
  title?: string;
  content?: string;
}

export interface DiaryIdDTO {
  diaryId: number;
}

export interface CreateDiaryDTO {
  bookId: number;
  userId: number;
  picture?: string;
  title?: string;
  content?: string;
}

export interface GetDiaryDTO {
  diaryId?: number;
  bookId?: number;
  userId?: number;
}

export interface UpdateDiaryDTO {
  diaryId?: number;
  picture?: string;
  title?: string;
  content?: string;
}
