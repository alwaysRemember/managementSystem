/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:34:08
 * @LastEditTime : 2020-01-16 16:32:04
 * @FilePath: /managementSystem/src/api/index.ts
 */
import http from '@/axios';
import { IData } from '@/pages/ServerIndex/interface';
import { IProductListSearch, ITableResponse } from '@/pages/ProductsList/interface';

const BASE_PATH = '/api';

/**
 * 登录
 * @param (params)  params.userName
 * @param (params)  params.password
 */
export const login = (params: { userName: string; password: string }) =>
  http({ type: 'post', url: `${BASE_PATH}/login`, params });

/**
 * 获取首页数据
 */
export const getServerIndexData = () =>
  http<IData>({ type: 'get', url: `${BASE_PATH}/serverIndex` });

/**
 * 获取产品列表页面操作栏数据
 */
export const getProductSearchData = () =>
  http<IProductListSearch>({ type: 'get', url: `${BASE_PATH}/productList/operationsData` });

/**
 * 获取产品列表页面表格数据
 */
export const getProductTableData = (params: {
  page: number;
  productName?: string;
  selectId?: string;
  checkList?: Array<string>;
}) =>
  http<ITableResponse>({
    type: 'post',
    url: `${BASE_PATH}/productList/tableData`,
    params,
    contentType: 'json',
  });

/**
 * 更新产品列表row的标签
 * @param params
 */
export const updateProductTableDataTag = (params: {
  rowId: number | string; // 产品id
  tagId: number | string; // 产品中的标签id
}) =>
  http<{ isSelect: boolean }>({
    type: 'post',
    url: `${BASE_PATH}/productList/updateTableTag`,
    params,
  });

/**
 * 更新产品列表row的状态
 * @param params
 */
export const updateProductTableDataStatus = (params: {
  rowId: string | number; //
}) =>
  http<{ status: number }>({
    type: 'post',
    url: `${BASE_PATH}/productList/updateTableStatus`,
    params,
  });

/**
 * 删除产品列表表格数据
 * @param params
 */
export const deleteProductTableData = (params: { rowIdList: Array<string | number> }) =>
  http({ type: 'post', url: `${BASE_PATH}/productList/deleteTableData`, params });

/**
 * 查询产品列表
 * @param params
 */
export const searchProductTableData = (params: {
  selectId: String;
  checkList: Array<string>;
  productName: string;
}) => http({ type: 'post', url: `${BASE_PATH}/productList/search`, params, contentType: 'json' });
