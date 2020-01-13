/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-10 15:56:17
 * @LastEditTime : 2020-01-13 16:46:52
 * @FilePath: /managementSystem/src/pages/ProductsList/interface.ts
 */
import { IOptionItem } from '@/components/OperationItem/interface';
import { ProductStatusEnums } from '@/enums/ProductStatusEnums';

export interface IProductListOperations {
  selectList: Array<IOptionItem>;
  checkList: Array<IOptionItem>;
}

export interface ITableResponse {
  page: number;
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
