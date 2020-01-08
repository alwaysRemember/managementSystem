/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-07 16:01:45
 * @LastEditTime : 2020-01-08 17:45:46
 * @FilePath: /managementSystem/src/pages/ServerIndex/index.d.ts
 */

// 页面所需数据数据
export interface IData {
  operationList: Array<IOperation>;
  lineEchart: ILineEchart;
  transformationEchart: ITransformationEchart;
}

interface IIcon {
  icon: string;
  color: string;
}
interface IEchartGlobalData<T> {
  itemList: Array<string>;
  dataList: Array<T>;
}

interface ILineEchart extends IEchartGlobalData<ILineEchartDataListItem> {
  dateList: Array<string>;
}

interface ITransformationEchart extends IEchartGlobalData<ITransformationEchartDataListItem> {}

interface ILineEchartDataListItem {
  label: string;
  value: Array<string | number>;
}

interface ITransformationEchartDataListItem {
  value: string | number;
  label: string;
}

// 运营数据
export interface IOperation extends IIcon {
  list: Array<IOperationItemTagList>;
}

// 运营数据tag列表
export interface IOperationItemTagList {
  title: string;
  num: number;
  msg?: string;
}

export interface IQuickEntry extends IIcon {
  title: string;
  url: string;
}

export interface IContactUs extends IIcon {
  title: string;
  subTitle: string;
}
