export interface BookEntity {
  bookId: number;
  bookName: string;
  color: string;
}

export interface UserBookDTO {
  bookId: number;
  userId: number;
}

export interface BookIdDTO {
  bookId: number;
}

export interface GetBookDTO {
  bookId?: number;
  bookName?: string;
  color?: string;
}
export interface CreateBookDTO {
  bookName: string;
  color: string;
}

export interface UpdateBookDTO {
  bookName?: string;
  color?: string;
}
