import React from 'react';
import { Select, Input, Checkbox } from 'antd';
import { ISearchItem, ISearchSelectItem } from './interface';

const { Option } = Select;
const { Group: CheckboxGroup } = Checkbox;
const SearchItem = ({
  selectList,
  selectChange,
  placeholder,
  value,
  checkBoxValueList,
  checkBoxList,
  checkBoxChange,
  inputChange = () => {},
  type,
}: ISearchItem) => {
  if (type === 'input') {
    return <Input value={value} placeholder={placeholder} onChange={inputChange} />;
  } else if (type === 'select') {
    return (
      <Select
        value={value || undefined}
        onChange={selectChange}
        placeholder={placeholder}
        getPopupContainer={e => e}
      >
        {selectList?.map((item: ISearchSelectItem, index: number) => (
          <Option value={item.id} key={index}>
            {item.value}
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

export default SearchItem;
