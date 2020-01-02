/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-02 14:24:50
 * @LastEditTime : 2020-01-02 15:52:33
 * @FilePath: /managementSystem/src/store/index.ts
 */

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ['userInfo'],
};

const myPersistReducer = persistReducer<any, any>(persistConfig, reducers);

const store = createStore(myPersistReducer, undefined, composeWithDevTools());

export const persistor = persistStore(store);
export default store;
