/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-09 19:01:29
 * @LastEditTime : 2020-01-16 16:25:24
 * @FilePath: /managementSystem/src/components/SearchItem/interface.ts
 */
import { ChangeEventHandler } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export interface ISearchItem {
  label?: string;
  type: Type; // 操作栏类型
  value?: string; // input/select的值
  selectChange?: (
    value: string,
    option: React.ReactElement<any> | React.ReactElement<any>[], // 选择框值改变方法
  ) => void;
  inputChange?: ChangeEventHandler; // 输入框值改变方法
  placeholder?: string;
  selectList?: Array<ISearchSelectItem>; // 选择框列表数据
  checkBoxList?: Array<string>; // 多选框列表数据
  checkBoxValueList?: Array<CheckboxValueType>; // 多选框选中的列表数据
  checkBoxChange?: (checkedValue: Array<CheckboxValueType>) => void; // 多选框值改变方法
}

export interface ISearchSelectItem {
  id: string | number;
  value: string;
}

type Type = 'select' | 'input' | 'checkBox';
