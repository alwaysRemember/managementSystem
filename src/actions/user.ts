/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-02 14:08:19
 * @LastEditTime : 2020-01-08 15:01:02
 * @FilePath: /managementSystem/src/actions/user.ts
 */

import { UPDATA_USERINFO } from '../constants';
import { IReduxAction } from '@/interface/Redux';
import { IUserInfo } from '@/interface/User';

/**
 * 更新用户信息
 * @param data 用户信息
 */
export const updateUser = (data: IUserInfo): IReduxAction<IUserInfo> => ({
  type: UPDATA_USERINFO,
  data,
});
