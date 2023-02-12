import { packageModel } from "../db/models";
import { DataObj, UserPackageDTO } from "../types";

type checkExpirationReturn = [Array<number>, DataObj];
type checkExpirationReducer = [Array<number>, Array<number>, DataObj];

export const checkExpiration = async (
  userIdDTO: UserPackageDTO
): Promise<checkExpirationReturn> => {
  const myPackagesInquiry = await packageModel.getOnlyUserPackage(userIdDTO);

  const [expireIds, myPackageIds, myPackagesTimeDic] = myPackagesInquiry.reduce(
    ([expireIds, ids, timeDic], cur) => {
      const diffdays = cur.expiration.getTime() - Date.now();
      const packageId: number = cur.packageId;
      if (diffdays < 0) expireIds.push(packageId);
      else {
        timeDic[packageId] = cur.expiration;
        ids.push(packageId);
      }
      return [expireIds, ids, timeDic];
    },
    [[], [], {}] as checkExpirationReducer
  );
  if (expireIds.length > 0) packageModel.deleteUserPackageByPackageIdArr(expireIds); //기다릴 필요 없을듯

  return [myPackageIds, myPackagesTimeDic];
};
