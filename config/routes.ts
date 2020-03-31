/*
 * @Author: Always
 * @LastEditors: Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-30 19:00:24
 * @LastEditTime: 2020-03-31 14:31:18
 * @FilePath: /managementSystem/config/routes.ts
 */
import { IRoute } from 'umi-types';

const routes: Array<IRoute> = [
  {
    path: '/login',
    component: './Login',
    title: '登录',
  },
  {
    path: '/server',
    component: '../layouts/ServerLayout',
    routes: [
      { path: '/server', component: './ServerIndex', title: '主页' },
      { path: '/server/productsList', component: './ProductsList', title: '产品列表' },
      { path: '/server/addProduct', component: './AddProduct', title: '添加产品' },
    ],
  },
];

export default routes;
