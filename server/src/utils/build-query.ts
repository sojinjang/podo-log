import { CreateUserDTO, DataObj } from "../types";

export class BuildQuery {
  constructor(public table: String) {}

  static objToKeyValueArr<T>(DTO: T) {
    const [keyArr, valueArr] = Object.entries(DTO).reduce(
      (agg, [key, value]) => {
        agg[0].push(key);
        agg[1].push(value);
        return agg;
      },
      [[], []] as [string[], Array<string | number | boolean>]
    );
    return { keyArr, valueArr };
  }

  static keyArrToWheres(keyArr: string[]) {
    return keyArr.map((key) => `${key} = ?`).join(" and ");
  }
  static keyArrToSets(keyArr: string[]) {
    return keyArr.map((key) => `${key} = ?`).join(", ");
  }

  makeCountQuery<T>(whereDTO?: T) {
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

  makeSelectQuery<T>(whereDTO?: T, columnArr: string[] = ["*"]) {
    let wheres, values;
    if (whereDTO === undefined) wheres = "";
    else {
      const { keyArr, valueArr } = BuildQuery.objToKeyValueArr(whereDTO);
      wheres = BuildQuery.keyArrToWheres(keyArr);
      values = valueArr;
    }

    const columns = columnArr.join(", ");
    const query = `select ${columns} from ${this.table} where ${wheres}`;
    return { query, values };
  }

  makeInsertQuery<T>(insertDTO: T) {
    const { keyArr, valueArr: values } = BuildQuery.objToKeyValueArr(insertDTO);

    const columns = keyArr.join(", ");
    const Qs = new Array(keyArr.length).fill("?").join(", ");

    const query = `insert into ${this.table} (${columns}) values (${Qs})`;
    return { query, values };
  }

  makeUpdateQuery<T, V>(updateDTO: T, whereDTO: V) {
    const { keyArr: updateKeyArr, valueArr: updateValueArr } =
      BuildQuery.objToKeyValueArr(updateDTO);
    const sets = BuildQuery.keyArrToSets(updateKeyArr);

    const { keyArr, valueArr } = BuildQuery.objToKeyValueArr(whereDTO);
    const wheres = BuildQuery.keyArrToWheres(keyArr);

    const values = updateValueArr.concat(valueArr);

    const query = `update ${this.table} set ${sets} where ${wheres}`;
    return { query, values };
  }

  makeDeleteQuery<T>(whereDTO: T) {
    const { keyArr, valueArr: values } = BuildQuery.objToKeyValueArr(whereDTO);
    const wheres = BuildQuery.keyArrToWheres(keyArr);

    const query = `delete from ${this.table} where ${wheres}`;
    return { query, values };
  }
}
