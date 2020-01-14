import React, { useState, useEffect } from 'react';
import { Button, Switch } from 'antd';
import OperationItem from '@/components/OperationItem';
import TSpin from '../../components/TSpin';
import Table from '../../components/Table';

import { IProductListOperations, ITableData, ITableDataTagList } from './interface';
import { IOperationItem, IOptionItem } from '@/components/OperationItem/interface';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import {
  getProductOperationsData,
  getProductTableData,
  updateProductTableDataTag,
  updateProductTableDataStatus,
} from '../../api';
import { setClassName, amountConver } from '@/utils';
import styles from './index.less';
import { ColumnProps } from 'antd/lib/table';

const ProductsList = (props: any) => {
  const [productName, setProductName] = useState<string>(''); // 查询的商品名称
  const [selectVal, setSelectVal] = useState(''); // 选择的商品分类id
  const [checkBoxList, setCheckBoxList] = useState<Array<CheckboxValueType>>([]); // 选中的商品标签最后提交的时候需要转为id传递

  const [btnLoading, setBtnLoading] = useState<boolean>(false); // 按钮loading状态
  const [tableDataLoading, setTableDataLoading] = useState<boolean>(true); // 表格加载状态

  const [tableData, setTableData] = useState<Array<ITableData>>([]);

  // 操作栏数据
  const [operationsData, setOperationsData] = useState<IProductListOperations>({
    checkList: [],
    selectList: [],
  });

  const getOperationsData = async () => {
    const data = await getProductOperationsData();
    setOperationsData(data);
  };

  const getTableData = async () => {
    setTableDataLoading(true);
    const { list, page } = await getProductTableData();
    setTableData(list);
    setTableDataLoading(false);
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

  /**
   * 表格标签点击
   * @param rowData  行数据
   * @param tag   标签数据
   */
  const tableDataTagClick = async (rowData: ITableData, tag: ITableDataTagList) => {
    setTableDataLoading(true);
    // 提交需要改变的数据
    try {
      const { isSelect } = await updateProductTableDataTag({ rowId: rowData.id, tagId: tag.id });
      // 改变原来的列表
      const data: Array<ITableData> = tableData.map(
        (item: ITableData): ITableData => {
          // 选出改变的数据
          if (item.id === rowData.id) {
            item.tagList = item.tagList.map(
              (i: ITableDataTagList): ITableDataTagList =>
                Object.assign({}, i, {
                  isSelect: i.id === tag.id ? isSelect : i.isSelect,
                }),
            );
          }
          return item;
        },
      );
      setTableData(data);
    } catch (code) {
      window.message.error('改变标签出错');
    } finally {
      setTableDataLoading(false);
    }
  };

  /**
   * 表格状态改变
   * @param rowData
   */
  const tableDataStatusChange = async (rowData: ITableData) => {
    setTableDataLoading(true);
    try {
      const { status } = await updateProductTableDataStatus({ rowId: rowData.id });
      const data: Array<ITableData> = tableData.map((item: ITableData) =>
        Object.assign({}, item, {
          status: item.id === rowData.id ? status : item.status,
        }),
      );
      setTableData(data);
    } catch (code) {
      window.message.error('改变状态出错');
    } finally {
      setTableDataLoading(false);
    }
  };

  // 操作框
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

  // 表格渲染数据
  const columns: Array<ColumnProps<ITableData>> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: 'logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo: string) => <img src={logo} alt="" width="40" height="40" />,
      align: 'center',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      render: (title: string) => <p className={styles.tableDataTitle}>{title}</p>,
      width: 200,
      ellipsis: true,
    },
    {
      title: '售价',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span>{amountConver(text)} 元</span>,
      align: 'center',
      width: 150,
    },
    {
      title: '原价',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      render: (text: number) => <span>{amountConver(text)} 元</span>,
      align: 'center',
      width: 150,
    },
    {
      title: '库存',
      dataIndex: 'inStock',
      key: 'inStock',
      align: 'center',
      width: 100,
    },
    {
      title: '标签',
      dataIndex: 'tagList',
      key: 'tagList',
      render: (list: Array<ITableDataTagList>, record: ITableData) => (
        <div style={{ textAlign: 'left' }}>
          {list.map((item: ITableDataTagList) => (
            <Button
              size="small"
              type={item.isSelect ? 'primary' : 'default'}
              key={`${item.id}_${record.id}`}
              style={{ margin: '2px' }}
              onClick={() => tableDataTagClick(record, item)}
            >
              {item.value}
            </Button>
          ))}
        </div>
      ),
      align: 'center',
      width: 230,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: number, record: ITableData) => (
        <Switch
          checkedChildren="上架"
          unCheckedChildren="下架"
          checked={!!value}
          onChange={(checked: boolean, event: Event) => tableDataStatusChange(record)}
        />
      ),
      align: 'center',
      width: 100,
    },
    {},
  ];

  useEffect(() => {
    getOperationsData();
    getTableData();
    return () => {};
  }, []);

  return (
    <div className={styles.productsListWrapper}>
      {/* 操作栏 */}
      <div className={styles.operationWrapper}>
        <TSpin isLoading={!Boolean(operationsData.checkList.length)} rows={3}>
          <div className={styles.operationContainer}>
            {/* 遍历操作框项 */}
            {operationsList.map((item: IOperationItem, index: number) => (
              <div
                className={setClassName([
                  styles.operationItem,
                  item.type === 'checkBox' ? styles.operationItemCheckBox : '',
                ])}
                key={index}
              >
                <span className={styles.operationItemLabel}>{item.label}</span>
                <div className={styles.operationItemVal}>
                  <OperationItem {...item} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.operationSearchBtn}>
            <Button icon="search" type="primary" loading={btnLoading} onClick={searchBtn}>
              搜索
            </Button>
          </div>
        </TSpin>
      </div>

      {/* 表格数据 */}
      <div className={styles.productsTableWrapper}>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableDataLoading}
          scroll={{ y: 540 }}
        />
      </div>
    </div>
  );
};

export default ProductsList;
