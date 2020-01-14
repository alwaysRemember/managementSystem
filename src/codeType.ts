/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:09:16
 * @LastEditTime : 2020-01-14 18:34:36
 * @FilePath: /managementSystem/src/codeType.ts
 */
import { TResponseCode } from './interface/Http';
import { HttpResponseCodeEnums } from './enums/HttpResponseCodeEnums';

export const codeType = (code: TResponseCode, message: string): Promise<any> => {
  return new Promise((res,rej) => {
    if (code === HttpResponseCodeEnums.ALERT) {
      // TODO 弹窗
      rej();
      return;
    }
    if (code === HttpResponseCodeEnums.NO_LOGIN) {
      //TODO 跳转登录页
      return;
    }
    res();
  });
};
