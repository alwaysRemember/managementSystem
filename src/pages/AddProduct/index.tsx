import React, { useState, useEffect } from 'react';
import styles from './index.less';
import TSpin from '../../components/TSpin';
import { IProductDetail } from './interface';
import { ProductStatusEnums } from '@/enums/ProductStatusEnums';
import RenderBasicInfoItem from './components/RenderBasicInfoItem';
import { getProductTagList } from '@/api';
import UploadImg from './components/UploadImg';
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

  /**
   * 监听基本信息更改
   * @param key
   * @param value
   */
  const basicInfoItemChange = (key: string, value: any) => {
    setData(prev =>
      Object.assign({}, prev, {
        [key]: value,
      }),
    );
  };

  /**
   * 获取taglist
   */
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

  /**
   * 上传主图方法
   * @returns Upload  Element
   * @returns file  File
   */
  const [Upload, file] = UploadImg(data.logo);

  useEffect(() => {
    getTagList();
  }, []);

  // 监听文件变更
  useEffect(() => {
    if (!file) return;
    setData(prev =>
      Object.assign({}, prev, {
        logo: file,
      }),
    );
  }, [file]);
  return (
    <div className={styles.addProductWrapper}>
      <div>
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

      <div>
        <h1 className={styles.addProductTitle}>商品主图</h1>
        <Upload />
      </div>
    </div>
  );
};

export default AddProduct;
