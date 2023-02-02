export interface CreateInvttCodeDTO {
  bookId: number;
  invttCode: string;
}
export interface GetInvttCodeDTO {
  codeId?: number;
  bookId?: number;
  invttCode?: string;
}
export interface InvttCodeDTO {
  invttCode: string;
}
