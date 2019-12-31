/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:09:16
 * @LastEditTime : 2019-12-31 17:28:02
 * @FilePath: /managementSystem/src/codeType.ts
 */
import { ResponseCode } from './interface/Http';
import { HttpResponseCodeEnums } from './enums/HttpResponseCodeEnums';

export const codeType = (code: ResponseCode, message: string): Promise<any> => {
  return new Promise((res,rej)=>{
   
    if(code === HttpResponseCodeEnums.ALERT){
        // TODO 弹窗
        rej();
        return;
    }
    if(code === HttpResponseCodeEnums.NO_LOGIN){
        //TODO 跳转登录页
        rej();
        return ;
    }
    res();
  })
};
