type Method = "c" | "u" | "d";
interface Result {
  fieldCount: Number;
  affectedRows: Number;
  insertId: Number;
  info: String;
  serverStatus: Number;
  warningStatus: Number;
  changedRows: Number;
}
interface Res {
  message: String;
  insertId?: Number;
}

export const buildRes = (method: Method, result: Result) => {
  let res: Res = { message: "" };
  switch (method) {
    case "c":
      if (result.affectedRows >= 1) {
        res.message = "생성에 성공하였습니다.";
        if (result.insertId) {
          res.insertId = result.insertId;
        }
      }
      return res;
    case "u":
      if (result.changedRows >= 1) {
        res.message = "업데이트에 성공하였습니다.";
      }
      if (result.affectedRows >= 1 && result.changedRows == 0) {
        res.message = "변화한 데이터가 없습니다.";
      }
      return res;
    case "d":
      if (result.affectedRows >= 1) {
        res.message = "삭제에 성공하였습니다.";
      }
      return res;
  }
};
