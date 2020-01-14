import React from 'react';
import { Table, Button } from 'antd';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { ButtonType } from 'antd/lib/button';

interface ITable<T> extends TableProps<T> {
  onSelectAllCb?: (selected: Boolean, selectedRow: Array<T>, changeRows: Array<T>) => void; // 选择框改变后cb
  onDeleteDataCb?: (data: T) => void; // 删除数据cb
}

interface IOperationListData {
  name: string;
  func: undefined | React.MouseEventHandler<HTMLElement>;
  type: ButtonType;
}

const TableCom = (props: ITable<any>) => {
  const { onDeleteDataCb } = props;

  //  操作栏
  const operationList: Array<IOperationListData> = [
    {
      name: '删除',
      func: onDeleteDataCb,
      type: 'danger',
    },
  ];

  // 根据使用情况来判断是否添加操作栏
  const showOperation = onDeleteDataCb;

  props.columns &&
    showOperation &&
    props.columns.push({
      title: '操作',
      fixed: 'right',
      render: (data: any, record: any, index: any) => {
        return operationList.map(
          (item: IOperationListData, index: number) =>
            item.func && (
              <Button
                key={index}
                type={item.type}
                onClick={item.func}
                size="small"
                style={{ margin: '5px' }}
              >
                {item.name}
              </Button>
            ),
        );
      },
      width: 200,
      align: 'center',
    });
  return (
    <Table
      {...props}
      bordered={true}
      rowKey={(record: any) => record.id}
      rowSelection={{
        fixed: true,
        onSelectAll: props.onSelectAllCb,
      }}
    />
  );
};

export default TableCom;
