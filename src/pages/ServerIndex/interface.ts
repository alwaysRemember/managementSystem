/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-07 16:01:45
 * @LastEditTime : 2020-01-07 16:05:11
 * @FilePath: /managementSystem/src/pages/ServerIndex/index.d.ts
 */

// 页面所需数据数据
export interface IData {
  operationList: Array<IOperation>;
}

// 运营数据
export interface IOperation {
  icon: string;
  color: string;
  list: Array<IOperationItemTagList>;
}

// 运营数据tag列表
export interface IOperationItemTagList {
  title: string;
  num: number;
  msg?: string;
}

export interface IQuickEntry {
  title: string;
  url: string;
  icon: string;
  color: string;
}
