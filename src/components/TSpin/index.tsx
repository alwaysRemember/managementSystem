import React from 'react';
import { Spin, Skeleton } from 'antd';
/**
 * 骨架屏和加载中结合
 * @param param0
 */
const TSpin = ({ isLoading, children }: { isLoading: boolean; children?: any }) => {
  return (
    <Spin tip="Loading" spinning={isLoading}>
      <Skeleton active={true} loading={isLoading} paragraph={{rows:10}}>
        {children}
      </Skeleton>
    </Spin>
  );
};

export default TSpin;
