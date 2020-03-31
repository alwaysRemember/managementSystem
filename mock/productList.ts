/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-01-15 16:44:10
 * @LastEditTime: 2020-03-31 17:18:43
 * @FilePath: /managementSystem/mock/productList.ts
 */
import { delay, responseData } from './index';

const tagList = [
  {
    id: 11,
    value: `推荐`,
    isSelect: false,
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
    isSelect: false,
  },
  {
    id: 15,
    value: `包邮`,
    isSelect: false,
  },
];

let list = [...Array(10).keys()].map(item => ({
  id: item,
  logo: 'http://t9.baidu.com/it/u=1307125826,3433407105&fm=79&app=86&f=JPEG?w=5760&h=3240',
  title: `产品名_${item}产品产品产品产品产品产品产品产品产品产品产品`,
  price: 1000,
  originalPrice: 10000,
  inStock: item * 2,
  status: item % 2 === 0 ? 0 : 1,
  tagList,
}));

export default {
  // 产品列表 -> 头部操作栏数据
  'GET /api/productList/operationsData': (req: any, res: any) => {
    delay(() => {
      const checkList = [...Array(8).keys()].map(item => ({
        id: item + 1,
        value: `${String.fromCharCode(65 + Math.ceil(Math.random() * 25))}_check_${item + 1}`,
      }));
      const selectList = [...Array(8).keys()].map(item => ({
        id: item + 1,
        value: `${String.fromCharCode(65 + Math.ceil(Math.random() * 25))}_select_${item + 1}`,
      }));
      res.json(
        responseData({
          checkList,
          selectList,
        }),
      );
    });
  },

  // 产品列表数据
  'POST /api/productList/tableData': (req: any, res: any) => {
    delay(() => {
      res.json(
        responseData({
          list,
          page: 2,
        }),
      );
    });
  },

  // 更新表格标签
  'POST /api/productList/updateTableTag': (req: any, res: any) => {
    delay(() =>
      res.json(
        responseData({
          isSelect: true,
        }),
      ),
    );
  },

  // 更新表格状态
  'POST /api/productList/updateTableStatus': (req: any, res: any) => {
    delay(() => res.json(responseData({ status: req.body.rowId % 2 === 0 })));
  },

  // 删除表格数据
  'POST /api/productList/deleteTableData': (req: any, res: any) => {
    const { rowIdList } = req.body;
    list = list.filter(item => {
      const index = rowIdList.findIndex((i: string) => Number(i) === item.id);
      if (index === -1) {
        return item;
      }
    });
    delay(() => res.json(responseData({})));
  },

  'GET /api/productList/tagList': (req: any, res: any) => {
    delay(() => res.json(responseData(tagList)));
  },
};
