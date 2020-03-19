/*
 * @Author: Always
 * @LastEditors: Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:44:12
 * @LastEditTime: 2020-03-19 18:42:00
 * @FilePath: /managementSystem/mock/index.ts
 */

import serverIndexData from './serverIndexData';
import productList from './productList';

export const delay = (cb: Function) => setTimeout(cb, 2000);

export const responseData = (data: any) => ({
  code: 0,
  data,
  message: '成功',
});

export default {
  // 登录
  'POST /api/login': (req: any, res: any) => {
    delay(() => res.json(responseData({ ...req.body, sessionid: '12312312312312312' })));
  },

  // 主页数据
  'GET /api/serverIndex': (req: any, res: any) => {
    delay(() => res.json(responseData(serverIndexData)));
  },
  ...productList,
};
