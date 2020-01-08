import { Method } from 'axios';
import { HttpResponseCodeEnums } from '@/enums/HttpResponseCodeEnums';

/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 16:57:23
 * @LastEditTime : 2020-01-08 17:54:42
 * @FilePath: /managementSystem/src/interface/Http.ts
 */
export interface IHttp {
  type?: Method;
  url: string;
  params?: object;
  contentType?: null | 'json';
}

export interface IHttpResponseData<T> {
  code: number;
  data: T;
  message: string;
}

export type TResponseCode =
  | HttpResponseCodeEnums.OK
  | HttpResponseCodeEnums.ALERT
  | HttpResponseCodeEnums.NO_LOGIN;
