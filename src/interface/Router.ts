/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-06 17:00:49
 * @LastEditTime : 2020-01-08 15:01:46
 * @FilePath: /managementSystem/src/interface/Router.ts
 */
export interface IRouter {
  path?: string;
  icon?: string;
  title: string;
  children?: Array<IRouter>;
}
