/*
 * @Author: Always
 * @LastEditors  : Always
 * @email: 740905172@qq.com
 * @Date: 2020-01-16 15:44:51
 * @LastEditTime : 2020-01-16 16:29:34
 * @FilePath: /managementSystem/src/components/SearchCom/interface.ts
 */
import { ISearchItem } from '../SearchItem/interface';
import { BaseButtonProps } from 'antd/lib/button/button';

export interface ISearchCom {
  searchList: Array<ISearchItem>;  // 搜索数据输入框选择框等
  isLoading: boolean; // 操作栏是否需要loading状态
  rows: number; // 骨架屏行数
  searchButtonList: Array<ISearchComButton>;  // 操作栏按钮
}

export interface ISearchComButton extends BaseButtonProps {
  onClick: React.MouseEventHandler<HTMLElement>;
}
