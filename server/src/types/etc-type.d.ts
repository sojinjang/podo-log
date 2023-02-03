export type DataObj = Record<string, string | number | boolean | Date | undefined>;

export interface MessageDTO {
  message: string;
  data?: any;
}
