/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:44:12
 * @LastEditTime : 2020-01-10 17:54:47
 * @FilePath: /managementSystem/mock/index.ts
 */

import serverIndexData from './serverIndexData';

const delay = (cb: Function) => setTimeout(cb, 2000);

const responseData = (data: any) => ({
  code: 0,
  data,
  message: '成功',
});

export default {
  'POST /api/login': (req: any, res: any) => {
    delay(() => res.json(responseData({ ...req.body, sessionid: '12312312312312312' })));
  },
  'GET /api/serverIndex': (req: any, res: any) => {
    delay(() => res.json(responseData(serverIndexData)));
  },
  'GET /api/productList/operationsData': (req: any, res: any) => {
    delay(() => {
      const checkList = [...Array(8).keys()].map(item => ({
        id: item,
        value: `${String.fromCharCode(65 + Math.ceil(Math.random() * 25))}_check_${item}`,
      }));
      const selectList = [...Array(8).keys()].map(item => ({
        id: item,
        value: `${String.fromCharCode(65 + Math.ceil(Math.random() * 25))}_select_${item}`,
      }));

      res.json(
        responseData({
          checkList,
          selectList,
        }),
      );
    });
  },
};
