/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-03-31 16:25:45
 * @LastEditTime: 2020-03-31 17:05:21
 * @FilePath: /managementSystem/src/pages/AddProduct/components/RenderBasicInfoItem/interface.ts
 */

export interface IRenderBasicInfoItem {
  itemKey: string;
  value: any;
  onChange: (key: string, value: any) => void;
}

export type TRenderBasicInfoItem = 'text' | 'switch' | 'number' | 'tag' | undefined;
