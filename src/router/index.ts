import { IRouter } from '@/interface/Router';

/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-06 17:00:20
 * @LastEditTime : 2020-01-09 15:39:11
 * @FilePath: /managementSystem/src/router/index.ts
 */

const routerList: Array<IRouter> = [
  {
    path: '/server',
    title: '主页',
  },
  {
    title: '产品管理',
    children: [
      {
        title: '产品列表',
        path: '/server/productsList',
      },
    ],
  },
];

export default routerList;
