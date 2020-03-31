import React, { useState, useEffect } from 'react';
import { Button, Switch } from 'antd';
import router from 'umi/router';
import Table from '../../components/Table';
import SearchCom from '../../components/SearchCom';
import ImgLazyLoad from '@/components/ImgLazyLoad';

import { IProductListSearch, ITableData, ITableDataTagList } from './interface';
import { ISearchItem, ISearchSelectItem } from '@/components/SearchItem/interface';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { IOperationListData } from '@/components/Table/interface';
import { ISearchComButton } from '@/components/SearchCom/interface';
import { ColumnProps } from 'antd/lib/table';

import {
  getProductSearchData,
  getProductTableData,
  updateProductTableDataTag,
  updateProductTableDataStatus,
  deleteProductTableData,
} from '../../api';

import { amountConver } from '@/utils';
import styles from './index.less';

const ProductsList = () => {
  const [productName, setProductName] = useState<string>(''); // 查询的商品名称
  const [selectId, setSelectId] = useState<string>(''); // 选择的商品分类id
  const [checkBoxList, setCheckBoxList] = useState<Array<CheckboxValueType>>([]); // 选中的商品标签最后提交的时候需要转为id传递
  const [searchBtnLoading, setSearchBtnLoading] = useState<boolean>(false); // 按钮loading状态

  const [totalPage, setTotalPage] = useState<number>(1); // 表格总页数
  const [currentPage, setCurrentPage] = useState<number>(1); // 当前页数
  const [tableDataLoading, setTableDataLoading] = useState<boolean>(false); // 表格加载状态

  const [tableData, setTableData] = useState<Array<ITableData>>([]);

  // 操作栏数据
  const [searchData, setSearchData] = useState<IProductListSearch>({
    checkList: [],
    selectList: [],
  });

  /**
   * 获取操作栏选择的数据
   */
  const getSearchData = async () => {
    try {
      const data = await getProductSearchData();
      setSearchData(data);
    } catch ({ code }) {}
  };

  /**
   * 获取表格数据
   * @parma {boolean} isInitData  是否为初始参数请求数据
   */
  const getTableData = (isInitData: boolean = false) => {
    return new Promise(async res => {
      // 防止多次点击加载数据
      if (tableDataLoading) {
        window.message.warn('正在获取数据，请稍等~');
        return;
      }

      setTableDataLoading(true);
      // 根据选中的标签获取对应的id
      const checkList: Array<string> = checkBoxList.map((value: CheckboxValueType) => {
        // 根据选中的标签遍历标签列表数据
        const val = searchData.checkList.find((data: ISearchSelectItem) => data.value === value);
        return val?.id as string;
      });

      try {
        // 定义请求数据对象
        const params = {
          page: isInitData ? 1 : currentPage,
          selectId: isInitData ? '' : selectId,
          checkList: isInitData ? [] : checkList,
          productName: isInitData ? '' : productName,
        };

        // 请求数据
        const { list, totalPage } = await getProductTableData(params);
        setTableData(list); // 设置表格数据
        setTotalPage(totalPage); // 设置总页数
        res();
      } catch ({ code }) {
      } finally {
        setTableDataLoading(false);
      }
    });
  };

  /**
   * 搜索按钮
   */
  const searchBtn = async () => {
    // 校验当三个搜索条件都未输入的情况
    if (selectId === '' && !checkBoxList.length && !productName) {
      window.message.error('请选择要查询的条件');
      return;
    }
    setSearchBtnLoading(true);
    try {
      await getTableData();
    } finally {
      setSearchBtnLoading(false);
    }
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
    } catch ({ code }) {
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
    } catch ({ code }) {
    } finally {
      setTableDataLoading(false);
    }
  };

  /**
   * 表格删除按钮
   * @param rotData
   */
  const tableDeleteData = (rowData: ITableData) => _deleteSelect([rowData]);

  /**
   * 表格编辑按钮
   * @param rowData
   */
  const tableEditData = (rowData: ITableData) => {};

  /**
   * 表格删除所选数据按钮
   * @param selectRows
   */
  const tableDeleteSelectData = async (selectRows: Array<ITableData>) => _deleteSelect(selectRows);

  /**
   * 请求后端删除表格数据
   * @param selectRows
   */
  const _deleteSelect = async (selectRows: Array<ITableData>) => {
    // 获取选择的数据id
    const rowIdList: Array<number | string> = selectRows.map((item: ITableData) => item.id);
    setTableDataLoading(true);
    try {
      await deleteProductTableData({ rowIdList });

      // 删除成功后再次获取一次数据 此处使用定时器是为了在finally后执行数据,避免重新请求数据的loading不显示
      const timer = setTimeout(() => {
        getTableData().then(() => {
          window.message.success({
            content: '删除成功',
            duration: 1,
          });
          clearTimeout(timer);
        });
      }, 0);
    } catch ({ code }) {
    } finally {
      setTableDataLoading(false);
    }
  };

  // 重置搜索栏数据
  const _resetSearchVal = () => {
    setProductName('');
    setCheckBoxList([]);
    setSelectId('');
  };

  // 搜索组件数据
  const searchComList: Array<ISearchItem> = [
    {
      label: '商品分类',
      type: 'select',
      value: selectId,
      selectChange: id => setSelectId(id),
      selectList: searchData.selectList,
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
      checkBoxList: (() => searchData.checkList.map((item: ISearchSelectItem) => item.value))(),
      checkBoxChange: (list: Array<CheckboxValueType>) => setCheckBoxList(list),
      checkBoxValueList: checkBoxList,
    },
  ];

  // 搜索组件中按钮
  const searchComButtonList: Array<ISearchComButton> = [
    {
      icon: 'search',
      children: '搜索',
      type: 'primary',
      loading: searchBtnLoading,
      onClick: searchBtn,
    },
    {
      icon: 'delete',
      children: '清除搜索数据',
      type: 'danger',
      onClick: () => {
        _resetSearchVal();
        getTableData(true);
      },
    },
  ];

  // 表格头部操作栏
  const tableTopOperation: Array<IOperationListData> = [
    {
      name: '添加产品',
      type: 'primary',
      disabled: true,
      func: () => router.push('/server/addProduct'),
      size: 'default',
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
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo: string) => (
        <ImgLazyLoad width={40} height={40} imgSrc={logo} loadingSize={40} />
      ),
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
    getSearchData();
    getTableData();
    return () => {};
  }, []);

  return (
    <div className={styles.productsListWrapper}>
      {/* 搜索组件 */}
      <SearchCom
        searchList={searchComList}
        isLoading={!Boolean(searchData.checkList.length)}
        rows={4}
        searchButtonList={searchComButtonList}
      />

      {/* 表格组件 */}
      <div className={styles.productsTableWrapper}>
        <Table
          columns={columns}
          dataSource={tableData}
          loading={tableDataLoading}
          onDeleteDataCb={tableDeleteData}
          onEditDataCb={tableEditData}
          onDeleteSelectDataCb={tableDeleteSelectData}
          tableTopOperationList={tableTopOperation}
          scroll={{ x: 1300 }}
        />
      </div>
    </div>
  );
};

export default ProductsList;
