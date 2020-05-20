/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-03-31 14:36:57
 * @LastEditTime: 2020-05-20 15:35:22
 * @FilePath: /managementSystem/src/pages/AddProduct/interface.ts
 */

import { productStatus, ITableDataTagList } from '../ProductsList/interface';

export interface IProductDetail {
  id: string | number;
  logo: string | File;
  title: string;
  price: number; // 售价 分
  originalPrice: number;
  inStock: number; // 库存
  status: productStatus;
  tagList: Array<ITableDataTagList>;
  detail: string;
  [key: string]: any;
}
