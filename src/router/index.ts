import { IRouter } from '@/interface/Router';

/*
 * @Author: Always
 * @LastEditors: Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-06 17:00:20
 * @LastEditTime: 2020-03-31 18:48:04
 * @FilePath: /managementSystem/src/router/index.ts
 */

const routerList: Array<IRouter> = [
  {
    path: '/server',
    title: '主页',
  },
  {
    title: '产品管理',
    key: 'product',
    children: [
      {
        title: '产品列表',
        path: '/server/product/productsList',
      },
      {
        title: '添加产品',
        path: '/server/product/addProduct',
      },
    ],
  },
];

export default routerList;
