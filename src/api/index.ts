/*
 * @Author: Always
 * @LastEditors: Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:34:08
 * @LastEditTime: 2020-03-31 17:19:03
 * @FilePath: /managementSystem/src/api/index.ts
 */
import http from '@/axios';
import { IData } from '@/pages/ServerIndex/interface';
import {
  IProductListSearch,
  ITableResponse,
  ITableDataTagList,
} from '@/pages/ProductsList/interface';

const BASE_PATH = '/api';

/**
 * 登录
 * @param (params)  params.userName
 * @param (params)  params.password
 */
export const login = (params: { userName: string; password: string }) =>
  http.request({ method: 'post', url: `${BASE_PATH}/login`, params });

/**
 * 获取首页数据
 */
export const getServerIndexData = () => http.request<IData>({ method: 'get', url: '/serverIndex' });

/**
 * 获取产品列表页面操作栏数据
 */
export const getProductSearchData = () =>
  http.request<IProductListSearch>({ method: 'get', url: `/productList/operationsData` });

/**
 * 获取产品列表页面表格数据
 */
export const getProductTableData = (params: {
  page: number;
  productName?: string;
  selectId?: string;
  checkList?: Array<string>;
}) =>
  http.request<ITableResponse>({
    method: 'post',
    url: `/productList/tableData`,
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
  http.request<{ isSelect: boolean }>({
    method: 'post',
    url: `/productList/updateTableTag`,
    params,
  });

/**
 * 更新产品列表row的状态
 * @param params
 */
export const updateProductTableDataStatus = (params: {
  rowId: string | number; //
}) =>
  http.request<{ status: number }>({
    method: 'post',
    url: `/productList/updateTableStatus`,
    params,
  });

/**
 * 删除产品列表表格数据
 * @param params
 */
export const deleteProductTableData = (params: { rowIdList: Array<string | number> }) =>
  http.request({ method: 'post', url: `/productList/deleteTableData`, params });

/**
 * 查询产品列表
 * @param params
 */
export const searchProductTableData = (params: {
  selectId: String;
  checkList: Array<string>;
  productName: string;
}) => http.request({ method: 'post', url: `/productList/search`, params, contentType: 'json' });

/**
 * 获取产品列表标签
 */
export const getProductTagList = () =>
  http.request<Array<ITableDataTagList>>({
    method: 'get',
    url: '/productList/tagList',
    contentType: 'json',
  });
