import { S3AccessURL } from "../config";
import { DataObj } from "../types";

export const buildImgLocation = (
  data: DataObj | DataObj[] | undefined,
  ...keys: string[]
): DataObj | DataObj[] | void => {
  if (typeof data === "undefined") return;
  if (Array.isArray(data)) {
    return data.map((cur) => {
      keys.forEach((key) => {
        if (cur[key] !== "없음" && cur[key] !== undefined) cur[key] = S3AccessURL + cur[key];
      });
      return cur;
    });
  } else {
    keys.forEach((key) => {
      if (data[key] !== "없음" && data[key] !== undefined) data[key] = S3AccessURL + data[key];
    });
    return data;
  }
};
