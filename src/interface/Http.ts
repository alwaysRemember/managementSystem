import { Method } from 'axios';
import { HttpResponseCodeEnums } from '@/enums/HttpResponseCodeEnums';

/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 16:57:23
 * @LastEditTime : 2019-12-31 17:49:00
 * @FilePath: /managementSystem/src/interface/Http.ts
 */
export interface Http {
  type?: Method;
  url: string;
  params?: object;
  contentType?: null | 'json';
}

export interface HttpResponseData {
  code: number;
  data: any;
  message: string;
}

export interface HttpRequestData {
  [key: string]: any;
}

export type ResponseCode =
  | HttpResponseCodeEnums.OK
  | HttpResponseCodeEnums.ALERT
  | HttpResponseCodeEnums.NO_LOGIN;
