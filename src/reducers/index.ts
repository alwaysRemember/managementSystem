/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-02 14:16:27
 * @LastEditTime : 2020-01-02 14:32:03
 * @FilePath: /managementSystem/src/reducers/index.ts
 */
import { combineReducers } from 'redux';

import * as user from './user';

export default combineReducers({ ...user });
