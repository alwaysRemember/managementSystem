/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-30 19:00:24
 * @LastEditTime : 2019-12-31 19:21:17
 * @FilePath: /weChatSalesSystem/src/routes/index.ts
 */
import { IRoute } from 'umi-types';

const routes: Array<IRoute> = [
  {
    path: '/login',
    component: './Login',
    title: '登录',
  },
];
export default routes;
