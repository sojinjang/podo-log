export interface DiaryEntity {
  diaryId: number;
  bookId: number;
  userId: number;
  picture: string;
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

export interface PageDTO {
  limit: number;
  offset: number;
}

export interface UpdateDiaryDTO {
  picture?: string;
  title?: string;
  content?: string;
}
export interface UpdateDiaryPictureDTO {
  diaryId?: number;
  picture?: string;
}

export interface PutStickersDTO extends UserDStikersDTO {
  stickers: stickersDTO[];
}

export interface StickedStickersDTO extends UserDStikersDTO, stickerDTO {}

export interface UserDStikersDTO {
  userId: number;
  diaryId: number;
}

export interface stickersDTO {
  stickerId: number;
  locX: number;
  locY: number;
}
