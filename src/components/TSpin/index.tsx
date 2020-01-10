import React from 'react';
import { Spin, Skeleton } from 'antd';
/**
 * 骨架屏和加载中结合
 * @param param0
 */
const TSpin = ({
  isLoading,
  children,
  rows=10,
}: {
  isLoading: boolean;
  children?: any;
  rows?: number;
}) => {
  return (
    <Spin tip="Loading" spinning={isLoading}>
      <Skeleton active={true} loading={isLoading} paragraph={{ rows }}>
        {children}
      </Skeleton>
    </Spin>
  );
};

export default TSpin;
