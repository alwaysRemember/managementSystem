/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:34:08
 * @LastEditTime : 2020-01-14 19:04:29
 * @FilePath: /managementSystem/src/api/index.ts
 */
import http from '@/axios';
import { IData } from '@/pages/ServerIndex/interface';
import { IProductListOperations, ITableData, ITableResponse } from '@/pages/ProductsList/interface';

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
export const getProductOperationsData = () =>
  http<IProductListOperations>({ type: 'get', url: `${BASE_PATH}/productList/operationsData` });

/**
 * 获取产品列表页面表格数据
 */
export const getProductTableData = () =>
  http<ITableResponse>({ type: 'post', url: `${BASE_PATH}/productList/tableData` });

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
