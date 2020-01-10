import React from 'react';
import { Select, Input, Checkbox } from 'antd';
import { IOperationItem } from './interface';

const { Option } = Select;
const { Group: CheckboxGroup } = Checkbox;
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
  if (type === 'input') {
    return <Input value={value} placeholder={placeholder} onChange={inputChange} />;
  } else if (type === 'select') {
    return (
      <Select onChange={selectChange} placeholder={placeholder} getPopupContainer={e => e}>
        {selectList?.map((item: string, index: number) => (
          <Option value={item} key={index}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else {
    return (
      <CheckboxGroup options={checkBoxList} value={checkBoxValueList} onChange={checkBoxChange} />
    );
  }
};

export default OperationItem;
