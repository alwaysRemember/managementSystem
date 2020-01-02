/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-30 19:00:24
 * @LastEditTime : 2020-01-02 11:20:03
 * @FilePath: /weChatSalesSystem/src/routes/index.ts
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
    routes: [{ path: '/server/', component: './ServerIndex', title: '主页' }],
  },
];
export default routes;
