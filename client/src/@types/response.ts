export type Token = string | undefined;

export interface BookInfo {
  readonly bookId: number;
  readonly bookName: string;
  readonly numMembers: number;
  readonly color: string;
}

export type BooksArr = BookInfo[] | null;

export interface MemberInfo {
  readonly userId: number;
  readonly nickname: string;
  readonly profile: string;
  readonly isMe: boolean;
}

export interface Diary {
  readonly bookId: number;
  readonly diaryId: number;
  readonly userId: number;
  readonly nickname: string;
  readonly title: string;
  readonly content: string;
  readonly profile: null | string;
  readonly picture: null | string;
  readonly stickers: null | [];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly numComments: number;
}

export interface CommentType {
  readonly commentId: number;
  readonly userId: number;
  readonly nickname: string;
  readonly profile: string;
  readonly parentCommentId: number;
  readonly reply: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CommentFamType {
  readonly parentComment: CommentType;
  readonly reComments: CommentType[];
}

export interface StickerInfo {
  readonly stickerId: number;
  readonly stickerImg: string;
}

export interface AffixedStickerInfo {
  stickedStickerId: number;
  stickerImg: string;
  locX: number;
  locY: number;
}

export interface MyStickerPack {
  readonly packageId: number;
  readonly packageName: string;
  readonly expiration: Date;
  readonly podoPrice: number;
  readonly stickers: StickerInfo[];
}

export type StickerPack = Omit<MyStickerPack, "expiration">;

export interface MyGrape {
  readonly grain: number;
  readonly grape: number;
}

export interface UserData {
  readonly nickname: string;
  readonly profile: string;
  readonly provider: "podo" | "kakao" | "naver";
  readonly createdAt: Date;
}
