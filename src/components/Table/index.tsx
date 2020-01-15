import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { ITable, IOperationListData } from './interface';

import styles from './index.less';
import { ColumnProps } from 'antd/lib/table';

/**
 *
 * @param param0
 */
const PopconfirmAndBtn = ({
  data: { msg, func, disabled, type, name, size = 'small' },
  record,
}: {
  data: IOperationListData;
  record: any;
}) => (
  <Popconfirm
    title={msg}
    onConfirm={e => func && func(record)}
    okText="确认"
    cancelText="取消"
    disabled={disabled}
  >
    <Button
      type={type}
      size={size}
      style={{ margin: '5px' }}
      onClick={e => func && disabled && func(record)}
    >
      {name}
    </Button>
  </Popconfirm>
);

const TableCom = (props: ITable<any>) => {
  const { onDeleteDataCb, onEditDataCb, onDeleteSelectDataCb, tableTopOperationList = [] } = props;

  const [selectRows, setSelectRows] = useState<Array<any>>([]); // 选择的表格数据

  /**
   * 存储选择的数据
   * @param selectRows
   */
  const onSelectCb = (selectRows: Array<any>) => {
    setSelectRows(selectRows);
  };

  /**
   * 删除所选数据之前方法
   */
  const afterDelectSelectData = () => {
    // 判断是否为空数据
    if (!selectRows.length) {
      window.message.error('请选择要删除的数据!');
      return;
    }
    onDeleteSelectDataCb && onDeleteSelectDataCb(selectRows);
  };

  // 表格头部操作框
  const topOperationList: Array<IOperationListData> = [
    {
      name: '删除所选',
      func: afterDelectSelectData,
      type: 'danger',
      msg: '是否删除所选数据?',
      size: 'default',
    },
    ...tableTopOperationList,
  ];

  //  表格操作栏  (根据方法判断是否显示)
  const operationList: Array<IOperationListData> = [
    {
      name: '删除',
      func: onDeleteDataCb,
      type: 'danger',
      msg: '是否确定要删除此条数据?',
    },
    {
      name: '编辑',
      func: onEditDataCb,
      type: 'primary',
      disabled: true,
    },
  ];

  // 根据使用情况来判断是否添加操作栏
  const showOperation = onDeleteDataCb;
  // 传递进来的columns与操作栏进行合并
  const columns: Array<ColumnProps<any>> =
    (showOperation && [
      {
        title: '操作',
        render: (data: any, record: any, index: any) => {
          return operationList.map(
            (item: IOperationListData, index: number) =>
              item.func && <PopconfirmAndBtn key={index} data={item} record={record} />,
          );
        },
        width: 200,
        align: 'center',
      },
    ]) ||
    [];
  return (
    <>
      <div className={styles.tableTitleWrapper}>
        {topOperationList.map((item: IOperationListData, index: number) => (
          <PopconfirmAndBtn data={item} key={index} record={selectRows} />
        ))}
      </div>
      <Table
        className={styles.tableContainer}
        {...props}
        columns={props.columns?.concat(columns)}
        rowKey={(record: any) => record.id}
        rowSelection={{
          onSelectAll: (selected: boolean, selectedRows: Array<any>, changeRows: Array<any>) =>
            onSelectCb && onSelectCb(selectedRows),
          onSelect: (
            record: any,
            selected: boolean,
            selectedRows: Array<any>,
            nativeEvent: Event,
          ) => onSelectCb && onSelectCb(selectedRows),
        }}
        scroll={Object.assign(
          {},
          {
            scrollToFirstRowOnChange: true,
          },
          props.scroll,
        )}
      />
    </>
  );
};

export default TableCom;
