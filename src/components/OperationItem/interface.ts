import { ChangeEventHandler } from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export interface IOperationItem {
  label?: string;
  type: Type; // 操作栏类型
  value?: string; // input的值
  selectChange?: (
    value: string,
    option: React.ReactElement<any> | React.ReactElement<any>[], // 选择框值改变方法
  ) => void;
  inputChange?: ChangeEventHandler; // 输入框值改变方法
  placeholder?: string;
  selectList?: Array<string>; // 选择框列表数据
  checkBoxList?: Array<string>; // 多选框列表数据
  checkBoxValueList?: Array<CheckboxValueType>; // 多选框选中的列表数据
  checkBoxChange?: (checkedValue: Array<CheckboxValueType>) => void; // 多选框值改变方法
}

type Type = 'select' | 'input' | 'checkBox';
