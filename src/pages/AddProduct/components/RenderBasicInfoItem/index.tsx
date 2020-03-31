import React, { ChangeEvent } from 'react';
import { Input, Switch, Tooltip, Button } from 'antd';
import styles from './index.less';
import { IRenderBasicInfoItem, TRenderBasicInfoItem } from './interface';
import { ITableDataTagList } from '@/pages/ProductsList/interface';

/**
 * key转为label
 * @param key
 */
const _keyConversionLabel = (key: string): string => {
  let label: string;
  switch (key) {
    case 'title':
      label = '标题';
      break;
    case 'price':
      label = '售价';
      break;
    case 'originalPrice':
      label = '原价';
      break;
    case 'inStock':
      label = '库存';
      break;
    case 'status':
      label = '状态';
      break;
    case 'tagList':
      label = '标签';
      break;
    default:
      label = '';
  }
  return label;
};

/**
 * 根据key来判断是什么类型
 * @param key
 */
const _keyConversionType = (key: string): TRenderBasicInfoItem => {
  if (key === 'id' || key === 'logo' || key === 'detail') {
    return undefined;
  }
  if (key === 'status') {
    return 'switch';
  }
  if (key === 'price' || key === 'originalPrice') {
    return 'number';
  }
  if (key === 'tagList') {
    return 'tag';
  }
  return 'text';
};

// 基本信息渲染
const RenderBasicInfoItem = ({ itemKey, value, onChange }: IRenderBasicInfoItem) => {
  const label: string = _keyConversionLabel(itemKey);
  const type: TRenderBasicInfoItem = _keyConversionType(itemKey);

  /**
   * 标签点击
   * @param data
   */
  const tagItemClick = (data: ITableDataTagList) => {
    const d: Array<ITableDataTagList> = value.map((item: ITableDataTagList) => {
      if (item.id === data.id) {
        item.isSelect = !item.isSelect;
      }
      return item;
    });
    onChange(itemKey, d);
  };

  return (
    (type && (
      <div className={styles.addProductBasicInfoItem}>
        <span className={styles.addProductBasicInfoItemLabel}>{label} :&nbsp;</span>
        <div className={styles.addProductBasicInfoItemValue}>
          {(type === 'text' && (
            <Input
              type={type}
              placeholder={`请输入标题${label}`}
              value={value === 0 ? '' : value}
              onChange={e => onChange(itemKey, e.target.value)}
            />
          )) ||
            (type === 'number' && (
              <Tooltip placement="right" title="以分为单位">
                <Input
                  type={type}
                  placeholder={`请输入标题${label}`}
                  value={value === 0 ? '' : value}
                  onChange={e => onChange(itemKey, e.target.value)}
                />
              </Tooltip>
            )) ||
            (type === 'switch' && (
              <Switch
                checkedChildren="上架"
                unCheckedChildren="下架"
                checked={Boolean(value)}
                onChange={(checked: boolean, e: Event) => onChange(itemKey, Number(checked))}
              />
            )) ||
            (type === 'tag' &&
              value.map((item: ITableDataTagList, index: number) => (
                <Button
                  size="small"
                  type={item.isSelect ? 'primary' : 'default'}
                  key={index}
                  style={{ margin: '2px' }}
                  onClick={() => tagItemClick(item)}
                >
                  {item.value}
                </Button>
              ))) ||
            null}
        </div>
      </div>
    )) ||
    null
  );
};

export default RenderBasicInfoItem;
