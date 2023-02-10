import { DataObj } from "../types";

export class BuildQuery {
  constructor(public table: String) {}

  static objToKeyValueArr(DTO: DataObj) {
    const [keyArr, valueArr] = Object.entries(DTO).reduce(
      (agg, [key, value]) => {
        if (typeof value === "undefined") return agg;
        agg[0].push(key);
        agg[1].push(value);
        return agg;
      },
      [[], []] as [string[], Array<any>]
    );
    return { keyArr, valueArr };
  }

  static keyArrToWheres(keyArr: string[]) {
    return keyArr.map((key) => `${key} = ?`).join(" and ");
  }
  static keyArrToSets(keyArr: string[]) {
    return keyArr.map((key) => `${key} = ?`).join(", ");
  }

  makeCountQuery(whereDTO?: DataObj) {
    let wheres, values;
    if (whereDTO === undefined) wheres = "";
    else {
      const { keyArr, valueArr } = BuildQuery.objToKeyValueArr(whereDTO);
      wheres = BuildQuery.keyArrToWheres(keyArr);
      values = valueArr;
    }
    const query = `SELECT COUNT(*) as totalData FROM ${this.table} where ${wheres}`;
    return { query, values };
  }

  makeSelectQuery(
    whereDTO?: DataObj,
    columnArr: string[] = ["*"],
    joinQuery: string = "",
    pageQuery: string = ""
  ) {
    let wheres, values;
    if (whereDTO === undefined) wheres = "";
    else {
      const { keyArr, valueArr } = BuildQuery.objToKeyValueArr(whereDTO);
      wheres = BuildQuery.keyArrToWheres(keyArr);
      values = valueArr;
    }

    const columns = columnArr.join(", ");
    const query = `select ${columns} from ${this.table} ${joinQuery} where ${wheres} ${pageQuery}`;
    return { query, values };
  }

  makeInsertQuery(insertDTO: DataObj) {
    const { keyArr, valueArr: values } = BuildQuery.objToKeyValueArr(insertDTO);

    const columns = keyArr.join(", ");
    const Qs = new Array(keyArr.length).fill("?").join(", ");

    const query = `insert into ${this.table} (${columns}) values (${Qs})`;
    return { query, values };
  }

  makeArrInsertQuery(stickerDTOArr: DataObj[]) {
    const values = stickerDTOArr.reduce((acc: any[], stickerDTO) => {
      const { valueArr: values } = BuildQuery.objToKeyValueArr(stickerDTO);
      acc = [...acc, ...values];
      return acc;
    }, []);
    const { keyArr } = BuildQuery.objToKeyValueArr(stickerDTOArr[0]);

    const columns = keyArr.join(", ");
    const Qs = new Array(keyArr.length).fill("?").join(", ");
    const manyQs = new Array(stickerDTOArr.length).fill(`(${Qs})`).join(", ");

    const query = `insert into ${this.table} (${columns}) values ${manyQs}`;
    return { query, values };
  }

  makeUpdateQuery(whereDTO: DataObj, updateDTO: DataObj) {
    const { keyArr: updateKeyArr, valueArr: updateValueArr } =
      BuildQuery.objToKeyValueArr(updateDTO);
    const sets = BuildQuery.keyArrToSets(updateKeyArr);

    const { keyArr, valueArr } = BuildQuery.objToKeyValueArr(whereDTO);
    const wheres = BuildQuery.keyArrToWheres(keyArr);

    const values = updateValueArr.concat(valueArr);

    const query = `update ${this.table} set ${sets} where ${wheres}`;
    return { query, values };
  }

  makeDeleteQuery(whereDTO: DataObj) {
    const { keyArr, valueArr: values } = BuildQuery.objToKeyValueArr(whereDTO);
    const wheres = BuildQuery.keyArrToWheres(keyArr);

    const query = `delete from ${this.table} where ${wheres}`;
    return { query, values };
  }
}
