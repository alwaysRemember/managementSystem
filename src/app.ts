/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-30 17:01:58
 * @LastEditTime : 2020-01-02 15:07:49
 * @FilePath: /weChatSalesSystem/src/app.ts
 */
import React from 'react';
import { StoreContext } from 'redux-react-hook';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store from './store';
import { persistor } from './store';

/**
 * 修改props参数
 * @param props
 * @param param1
 */
export function modifyRouteProps(props: any, { route }: any): void {
  const { title } = route;
  // 设置title
  document.title = title || '后台管理系统';
  return { ...props };
}

/**
 * 嵌套根组件
 * @param container 应用根组件
 */
export function rootContainer(container: any) {
  const ProviderContainer = React.createElement(StoreContext.Provider, { value: store }, container);
  const PrsistGateContainer = React.createElement(
    PersistGate,
    { loading: null, persistor },
    ProviderContainer,
  );
  return PrsistGateContainer;
}
