/*
 * @Author: Always
 * @LastEditors: Always
 * @email: 740905172@qq.com
 * @Date: 2020-03-19 15:45:36
 * @LastEditTime: 2020-03-19 18:43:30
 * @FilePath: /managementSystem/src/axios.ts
 */
import axios, {
  Method,
  AxiosRequestConfig,
  CancelTokenStatic,
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import Qs from 'qs';

import { codeType } from './codeType';
import { HttpResponseCodeEnums } from './enums/HttpResponseCodeEnums';
import { IHttpResponseData } from './interface/Http';

type TContentType = 'form' | 'json' | 'formData';
interface IAxiosRequest {
  url: string;
  method: Method;
  params?: any;
  contentType?: TContentType;
}

class Axios {
  private timeout: number = 30000; // 超时时间
  private withCredentials: boolean = true; // 跨域是否使用凭证
  private baseURL: string = this._setHost('/api'); //自动加在url前的参数

  /**
   * 数据请求体
   * @param options {IAxiosRequest}
   */
  request<T>(options: IAxiosRequest): Promise<T> {
    let instance: AxiosInstance = axios.create();

    this._setInterceptors(instance);

    return new Promise<T>(async (resolve, reject) => {
      instance(this._setRequestOptions(options))
        .then(async (res: AxiosResponse<IHttpResponseData<T>>) => {
          const { code, message, data } = res.data;
          // 数据过滤
          try {
            await codeType(code, message);
            resolve(data);
          } catch (e) {
            // reject({ code, message });
          }
        })
        .catch(async e => {
          try {
            // 过滤掉主动终结的请求
            if (e.message !== 'cancel') {
              await codeType(-1, 'server connection timed out!');
            }
          } catch (e) {
            reject({ code: HttpResponseCodeEnums.TIME_OUT });
          }
        });
    });
  }

  /**
   * 添加拦截器
   * @param instance 请求实例
   */
  _setInterceptors(instance: AxiosInstance) {
    // 请求拦截器
    instance.interceptors.request.use(config => config);

    // 响应拦截器
    instance.interceptors.response.use(
      response => response,
      error => Promise.reject(error),
    );
  }

  /**
   * 设置默认的域名
   * @param baseUrl
   */
  _setHost(baseUrl: string): string {
    let host: string = '';
    // 判断是否为开发环境，如果是开发环境则直接为默认的baseurl
    if (process.env.NODE_ENV === 'development') {
      host = baseUrl;
    } else {
      host = window.location.origin;
    }
    return host;
  }

  /**
   * 设置请求体
   * @param options
   */
  _setRequestOptions(options: IAxiosRequest): AxiosRequestConfig {
    if (!options.contentType) options.contentType = 'form';
    const CancelToken: CancelTokenStatic = axios.CancelToken;
    // 请求体数据处理以及合并
    let op: AxiosRequestConfig = {
      timeout: this.timeout,
      url: options.url,
      method: options.method,
      withCredentials: this.withCredentials,
      baseURL: this.baseURL,
      headers: {
        contentType: this._setContentType(options.contentType),
      },
      cancelToken: new CancelToken(c => {
        window.cancelRequestFnList.push(c);
      }),
    };
    // 根据请求方式，来判断是否需要处理请求数据
    if (options.method === 'get') {
      op = { ...op, ...{ params: Qs.stringify(options.params) } };
    } else {
      op = { ...op, ...{ data: options.params } };
    }
    return op;
  }

  /**
   * 设置请求类型
   * @param ct
   */
  _setContentType(ct: TContentType): string {
    let contentType: string;
    switch (ct) {
      case 'form':
        contentType = 'application/x-www-form-urlencoded';
        break;
      case 'formData':
        contentType = 'multipart/form-data';
        break;
      case 'json':
        contentType = 'application/json';
        break;
      default:
        contentType = 'application/x-www-form-urlencoded';
    }
    return contentType;
  }
}
export default new Axios();
