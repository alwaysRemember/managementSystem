import { TAmount } from '@/interface/global';

/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-10 17:05:26
 * @LastEditTime : 2020-01-13 16:12:03
 * @FilePath: /managementSystem/src/utils/index.ts
 */

/**
 * 设置类名
 * @param list 类名列表
 */
export const setClassName = (list: Array<any>) => list.join(' ');

/**
 * 金额单位转换
 * @param amount 
 * @param type 
 */
export const amountConver = (amount: number | string, type: TAmount = 'yuan') => {
  if (type === 'yuan') {
    return (Number(amount) / 100).toFixed(2);
  } else {
    return Number(amount) * 100;
  }
};
