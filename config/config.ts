/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 19:10:53
 * @LastEditTime : 2020-01-02 11:18:53
 * @FilePath: /managementSystem/config/index.ts
 */

import { IConfig } from 'umi-types';
import routes from "./routes";

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
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
