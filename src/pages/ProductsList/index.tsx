import React, { useState, useRef } from 'react';

import OperationItem from '@/components/OperationItem';
import styles from './index.less';
import { IOperationItem } from '@/components/OperationItem/interface';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const ProductsList = (props: any) => {
  const [productName, setProductName] = useState<string>('');
  const [selectVal, setSelectVal] = useState('');
  const [checkBoxList, setCheckBoxList] = useState<Array<CheckboxValueType>>([]);

  /**
   * 操作框
   */
  const operationList: Array<IOperationItem> = [
    {
      label: '商品分类',
      type: 'select',
      selectChange: value => setSelectVal(value),
      selectList: ['A', 'B', 'C', 'D', 'E', 'A1', 'B2', 'C3', 'D4', 'E5'],
      placeholder: '请选择分类',
    },
    {
      label: '商品名称',
      type: 'input',
      value: productName,
      placeholder: '请输入商品名称',
      inputChange: (e: any) => setProductName(e.target.value),
    },
    {
      label: '商品标签',
      type: 'checkBox',
      checkBoxList: ['A', 'B', 'C', 'E'],
      checkBoxChange: (list: Array<CheckboxValueType>) => setCheckBoxList(list),
      checkBoxValueList: checkBoxList,
    },
  ];
  return (
    <div className={styles.productsListWrapper}>
      <div className={styles.operationWrapper}>
        {/* 遍历操作框项 */}
        {operationList.map((item: IOperationItem, index: number) => (
          <div className={styles.operationItem} key={index}>
            <span className={styles.operationItemLabel}>{item.label}</span>
            <div className={styles.operationItemVal}>
              <OperationItem {...item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
