/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 17:34:08
 * @LastEditTime : 2019-12-31 17:58:39
 * @FilePath: /managementSystem/src/api/index.ts
 */
import http from '@/axios';
import { HttpRequestData } from '@/interface/Http';

const BASE_PATH = '/api';

/**
 * 登录
 * @param (params)  params.userName
 * @param (params)  params.password
 */
export const login = (params: HttpRequestData) =>
  http({ type: 'post', url: `${BASE_PATH}/login`, params });
