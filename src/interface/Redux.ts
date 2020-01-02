/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-02 14:13:06
 * @LastEditTime : 2020-01-02 14:23:03
 * @FilePath: /managementSystem/src/interface/redux.ts
 */

export interface ReduxAction<T> {
  type: string;
  data: T;
}
