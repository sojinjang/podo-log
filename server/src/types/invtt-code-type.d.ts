export interface CreateInvttCodeDTO {
  bookId: number;
  invttCode: string;
}
export interface GetInvttCodeDTO {
  bookId?: number;
  invttCode?: string;
}
export interface InvttCodeDTO {
  invttCode: string;
}
