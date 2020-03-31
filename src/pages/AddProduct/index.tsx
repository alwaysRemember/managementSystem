import React, { useState, ChangeEvent, useEffect } from 'react';
import styles from './index.less';
import TSpin from '../../components/TSpin';
import { IProductDetail } from './interface';
import { ProductStatusEnums } from '@/enums/ProductStatusEnums';
import { ITableDataTagList } from '../ProductsList/interface';
import RenderBasicInfoItem from './components/RenderBasicInfoItem';
import { getProductTagList } from '@/api';
// 添加产品
const AddProduct = () => {
  const [data, setData] = useState<IProductDetail>({
    id: '',
    logo: '',
    title: '',
    price: 0,
    originalPrice: 0,
    inStock: 0,
    status: ProductStatusEnums.SHELVES,
    tagList: [],
    detail: '',
  });
  // 产品标签
  const [tagList, setTagList] = useState<ITableDataTagList | []>([]);

  const basicInfoItemChange = (key: string, value: any) => {
    setData(prev =>
      Object.assign({}, prev, {
        [key]: value,
      }),
    );
  };

  const getTagList = async () => {
    try {
      const data = await getProductTagList();
      setData(prev =>
        Object.assign({}, prev, {
          tagList: data,
        }),
      );
    } catch (e) {}
  };

  useEffect(() => {
    getTagList();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className={styles.addProductWrapper}>
      <h1 className={styles.addProductTitle}>基本信息</h1>
      <TSpin isLoading={!Boolean(data.tagList.length)} rows={8}>
        <div className={styles.addProductBasicInfo}>
          {Object.keys(data).map((key: string) => (
            <RenderBasicInfoItem
              key={key}
              itemKey={key}
              value={data[key]}
              onChange={basicInfoItemChange}
            />
          ))}
        </div>
      </TSpin>
    </div>
  );
};

export default AddProduct;
