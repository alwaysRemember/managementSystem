import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'antd';
import OperationItem from '@/components/OperationItem';
import styles from './index.less';
import { IOperationItem, IOptionItem } from '@/components/OperationItem/interface';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import TSpin from '../../components/TSpin';
import { getProductOperationsData } from '../../api';
import { IProductListOperations } from './interface';
import { setClassName } from '@/utils';

const ProductsList = (props: any) => {
  const [productName, setProductName] = useState<string>(''); // 查询的商品名称
  const [selectVal, setSelectVal] = useState(''); // 选择的商品分类id
  const [checkBoxList, setCheckBoxList] = useState<Array<CheckboxValueType>>([]); // 选中的商品标签最后提交的时候需要转为id传递

  const [btnLoading, setBtnLoading] = useState(false); // 按钮loading状态

  const [operationsData, setOperationsData] = useState<IProductListOperations>({
    checkList: [],
    selectList: [],
  });

  /**
   * 操作框
   */
  const operationsList: Array<IOperationItem> = [
    {
      label: '商品分类',
      type: 'select',
      selectChange: id => setSelectVal(id),
      selectList: operationsData.selectList,
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
      checkBoxList: (() => operationsData.checkList.map((item: IOptionItem) => item.value))(),
      checkBoxChange: (list: Array<CheckboxValueType>) => setCheckBoxList(list),
      checkBoxValueList: checkBoxList,
    },
  ];

  const getOperationsData = async () => {
    const data = await getProductOperationsData();
    setOperationsData(data);
  };

  /**
   * 搜索按钮
   */
  const searchBtn = (): void => {
    // 根据选中的标签获取对应的id
    const checkList: Array<number | string | undefined> = checkBoxList.map(
      (value: CheckboxValueType) => {
        // 根据选中的标签遍历标签列表数据
        const val = operationsData.checkList.find((data: IOptionItem) => data.value === value);
        return val?.id;
      },
    );
  };

  useEffect(() => {
    getOperationsData();
  }, []);

  return (
    <div className={styles.productsListWrapper}>
      <TSpin isLoading={!Boolean(operationsData.checkList.length)} rows={4}>
        <div className={styles.operationWrapper}>
          {/* 遍历操作框项 */}
          {operationsList.map((item: IOperationItem, index: number) => (
            <div className={setClassName([styles.operationItem,item.type==="checkBox"?styles.operationItemCheckBox:""])} key={index}>
              <span className={styles.operationItemLabel}>{item.label}</span>
              <div className={styles.operationItemVal}>
                <OperationItem {...item} />
              </div>
            </div>
          ))}
          <div className={styles.operationSearchBtn}>
            <Button icon="search" type="primary" loading={btnLoading} onClick={searchBtn}>
              搜索
            </Button>
          </div>
        </div>
      </TSpin>
    </div>
  );
};

export default ProductsList;
