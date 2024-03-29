import { RowDataPacket } from "mysql2";

export type DataObj = Record<string, any>;

export interface MessageDTO {
  message: string;
  data?: any;
}

export interface DicComment {
  [key: number]: Array<RowDataPacket>;
}

export interface TokenConfig {
  secretKey: string;
  time: string;
}

export type checkExpirationReturn = [Array<number>, DataObj];
export type checkExpirationReducer = [Array<number>, Array<number>, DataObj];
