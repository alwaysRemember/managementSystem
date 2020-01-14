/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 15:25:30
 * @LastEditTime : 2020-01-14 18:58:58
 * @FilePath: /managementSystem/typings.d.ts
 */
declare module '*.css';
declare module '*.png';
declare module '*.less';
interface Window {
  // axios请求中止函数
  cancelRequestFnList: Array<Function>;
  message: any;
}
