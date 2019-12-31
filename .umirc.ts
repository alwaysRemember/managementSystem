/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-30 17:01:58
 * @LastEditTime : 2019-12-31 11:58:53
 * @FilePath: /weChatSalesSystem/.umirc.ts
 */

import { IConfig } from 'umi-types';
import routes from './src/routes';

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
  /* routes: [
    {
      path: '/login',
      component: './Login',
      title: '登录',
    },
  ], */
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'weChatSalesSystem',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};

export default config;
