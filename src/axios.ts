/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2019-12-31 16:51:57
 * @LastEditTime : 2020-01-09 17:20:48
 * @FilePath: /managementSystem/src/axios.ts
 */
/* eslint-disable */
import axios, { AxiosResponse, CancelTokenStatic } from 'axios';
import Qs from 'qs';
import { IHttp, IHttpResponseData, IResponse } from './interface/Http';
import { codeType } from './codeType';

// 设置全局axios默认值
axios.defaults.timeout = 30000; // 20000的超时验证
axios.defaults.withCredentials = true; // 跨域带cookie

export default function http<T>({
  type = 'get',
  url,
  params,
  contentType = null,
}: IHttp): Promise<T> {
  const contentTypeUse =
    contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded';
  const paramsUse = contentType === 'json' ? params : Qs.stringify(params);

  const CancelToken: CancelTokenStatic = axios.CancelToken; // 创建token

  const requestParams = {
    method: type,
    headers:
      type === 'get'
        ? {}
        : Object.assign(
            {},
            {
              'Content-Type': contentTypeUse,
            },
          ),
    url,
    [type === 'get' ? 'params' : 'data']: type === 'get' ? params : paramsUse,
  };

  for (const key in requestParams) {
    if (key === '' || !requestParams[key]) {
      Reflect.deleteProperty(requestParams, key);
    }
  }
  return new Promise<T>((resolve, reject) => {
    axios({
      ...requestParams,
      cancelToken: new CancelToken(c => {
        window.cancelRequestFn = c;
      }),
    })
      .then((res: AxiosResponse<IHttpResponseData<T>>) => {
        const { code, message, data } = res.data;
        // 数据过滤
        codeType(code, message)
          .then(() => resolve(data))
          .catch(() => reject(code));
      })
      .catch(() => codeType(-1, 'server connection timed out!'));
  });
}
