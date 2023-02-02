import { ResultSetHeader } from "mysql2";
import { InternalError } from "../core/api-error";
import { MessageDTO } from "../types";

const isSuccess = (result: ResultSetHeader) => {
  let status: boolean;
  if (result.changedRows === undefined) {
    status = result.affectedRows >= 1 ? true : false;
  } else {
    status = result.changedRows >= 1 ? true : false;
  }
  return status;
};

export const checkResult = (
  result: ResultSetHeader,
  successM: string = "성공하였습니다.",
  failM: string = "요청한 내용으로 DB에서 처리할 수 없습니다."
) => {
  let messageDTO: MessageDTO = { message: "" };
  if (isSuccess(result)) {
    messageDTO.message = successM;
    if (result.insertId) messageDTO.insertId = result.insertId;
  } else {
    throw new InternalError(failM);
  }
  return messageDTO;
};
