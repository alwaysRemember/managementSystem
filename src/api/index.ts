/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:34:08
 * @LastEditTime : 2020-01-08 17:58:44
 * @FilePath: /managementSystem/src/api/index.ts
 */
import http from '@/axios';
import { IData } from '@/pages/ServerIndex/interface';

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
