import React from 'react';
import { Select, Input,Checkbox } from 'antd';
import { IOperationItem } from './interface';

const { Option } = Select;
const {Group:CheckboxGroup} = Checkbox;
const OperationItem = ({
  selectList,
  selectChange,
  placeholder,
  value,
  checkBoxValueList,
  checkBoxList,
  checkBoxChange,
  inputChange = () => {},
  type,
}: IOperationItem) => {
  const SelectFn = () => (
    <Select
      onChange={selectChange}
      placeholder={placeholder}
      getPopupContainer={e => e}
    >
      {selectList?.map((item: string, index: number) => (
        <Option value={item} key={index}>
          {item}
        </Option>
      ))}
    </Select>
  );

  const InputFn = () => <Input value={value} placeholder={placeholder} onChange={inputChange} />;

  const CheckBoxFn = ()=><CheckboxGroup options={checkBoxList} value={checkBoxValueList} onChange={checkBoxChange}   />

  if (type === 'input') {
    return <InputFn />;
  } else if(type === "select") {
    return <SelectFn />;
  }else {
      return <CheckBoxFn />
  }
};

export default OperationItem;
