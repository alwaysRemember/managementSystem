/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:12:22
 * @LastEditTime : 2020-01-15 19:09:53
 * @FilePath: /managementSystem/src/enums/HttpResponseCodeEnums.ts
 */

// 请求状态码
export enum HttpResponseCodeEnums {
  OK = 0,
  ALERT = -1,
  NO_LOGIN = -2,
  TIME_OUT = -999, // 请求超时等无法正常解析的状态，会从http直接返回给业务
}
