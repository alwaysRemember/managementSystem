import { Method } from 'axios';
import { HttpResponseCodeEnums } from '@/enums/HttpResponseCodeEnums';

/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 16:57:23
 * @LastEditTime : 2020-01-09 16:19:08
 * @FilePath: /managementSystem/src/interface/Http.ts
 */
export interface IHttp {
  type?: Method;
  url: string;
  params?: object;
  contentType?: null | 'json';
}

export interface IResponse<T> {
  data: T;
  cancel: TCancel;
}

export interface IHttpResponseData<T> {
  code: number;
  data: T;
  message: string;
}

export type TCancel = Function | null;

export type TResponseCode =
  | HttpResponseCodeEnums.OK
  | HttpResponseCodeEnums.ALERT
  | HttpResponseCodeEnums.NO_LOGIN;
