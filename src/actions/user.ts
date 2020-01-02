/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-02 14:08:19
 * @LastEditTime : 2020-01-02 14:22:18
 * @FilePath: /managementSystem/src/actions/user.ts
 */

import { UPDATA_USERINFO } from '../constants';
import { ReduxAction } from '@/interface/Redux';
import { UserInfo } from '@/interface/User';

/**
 * 更新用户信息
 * @param data 用户信息
 */
export const updateUser = (data: UserInfo): ReduxAction<UserInfo> => ({
  type: UPDATA_USERINFO,
  data,
});
