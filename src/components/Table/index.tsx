import React from 'react';
import { Table } from 'antd';
import { TableProps, ColumnProps } from 'antd/lib/table';

interface ITable<T> extends TableProps<T> {
  onSelectAllCb?: (selected: Boolean, selectedRow: Array<T>, changeRows: Array<T>) => void;
}

const TableCom = (props: ITable<any>) => {
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
