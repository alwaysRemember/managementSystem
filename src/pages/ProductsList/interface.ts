/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-10 15:56:17
 * @LastEditTime : 2020-01-16 16:31:49
 * @FilePath: /managementSystem/src/pages/ProductsList/interface.ts
 */
import { ISearchSelectItem } from '@/components/SearchItem/interface';
import { ProductStatusEnums } from '@/enums/ProductStatusEnums';

export interface IProductListSearch {
  selectList: Array<ISearchSelectItem>;
  checkList: Array<ISearchSelectItem>;
}

export interface ITableResponse {
  totalPage: number;
  list: Array<ITableData>;
}

export interface ITableData {
  id: string | number;
  logo: string;
  title: string;
  price: number; // 售价  分
  originalPrice: number; // 原价  分
  inStock: number; // 库存
  status: productStatus;
  tagList: Array<ITableDataTagList>;
}

/**
 * 商品标签
 */
export interface ITableDataTagList {
  id: string | number;
  value: string;
  isSelect: Boolean;
}

export type productStatus = ProductStatusEnums.SHELVES | ProductStatusEnums.TAKE_OFF; // 商品状态
