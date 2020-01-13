/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:44:12
 * @LastEditTime : 2020-01-13 18:54:50
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

  'POST /api/productList/tableData': (req: any, res: any) => {
    delay(() => {
      const list = [...Array(10).keys()].map(item => ({
        id: item,
        logo: 'http://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&f=JPEG?w=5760&h=3240',
        title: `产品名_${item}产品产品产品产品产品产品产品产品产品产品产品`,
        price: 1000,
        originalPrice: 10000,
        inStock: item * 2,
        status: item % 2 === 0 ? 0 : 1,
        tagList: [
          {
            id: 11,
            value: `推荐`,
            isSelect: true,
          },
          {
            id: 12,
            value: `新品`,
            isSelect: false,
          },
          {
            id: 13,
            value: `热卖`,
            isSelect: false,
          },
          {
            id: 14,
            value: `促销`,
            isSelect: true,
          },
          {
            id: 15,
            value: `包邮`,
            isSelect: false,
          },
        ],
      }));
      res.json(
        responseData({
          list,
          page: 2,
        }),
      );
    });
  },
};
