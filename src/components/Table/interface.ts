/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-15 15:15:11
 * @LastEditTime : 2020-01-15 16:39:59
 * @FilePath: /managementSystem/src/components/Table/interface.ts
 */
import { TableProps } from 'antd/lib/table';
import { ButtonType, ButtonSize } from 'antd/lib/button';

export interface ITable<T> extends TableProps<T> {
  onDeleteDataCb?: (data: T) => void; // 删除数据cb
  onEditDataCb?: (data: T) => void; // 编辑数据cb
  onDeleteSelectDataCb?: (selectRows: Array<T>) => void; // 删除选择的数据cb
  tableTopOperationList?: Array<IOperationListData>; // 表格头部的操作标签
}

export interface IOperationListData {
  name: string;
  func: any;
  type: ButtonType;
  msg?: string;
  disabled?: boolean; // 是否显示确认框  true 不显示 false 显示
  size?: ButtonSize;
}
