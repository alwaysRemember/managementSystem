import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';

import { UploadChangeParam } from 'antd/lib/upload';
import ImgLazyLoad from '@/components/ImgLazyLoad';
import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';

/**
 * 上传文件
 * @param imgSrc
 */
const UploadImg: any = (imgSrc: string | File) => {
  const [file, setFile] = useState<File | Blob>(); // file文件

  const [previewImg, setPreviewImg] = useState<string>(''); // 预览的路径

  /**
   * 文件切换
   * @param data  文件
   */
  const uploadChange = (data: UploadChangeParam) => {
    if (data.file.status !== 'done') return;
    setFile(data.file.originFileObj);
  };

  useEffect(() => {
    // 判断是否原本有图片，如果有的话直接赋值预览
    if (imgSrc && typeof imgSrc === 'string') {
      setPreviewImg(imgSrc);
      return;
    }
    if (!file) return;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setPreviewImg(e?.srcElement!.result);
    };
  }, [imgSrc, file]);

  return [
    () => (
      <Upload
        accept="image/*"
        listType="picture-card"
        className={styles['upload-img']}
        showUploadList={false}
        onChange={uploadChange}
      >
        {previewImg && typeof previewImg === 'string' ? (
          <div className={styles['upload-img-preview']}>
            <ImgLazyLoad width="100%" height="100%" imgSrc={previewImg} loadingSize={40} />
          </div>
        ) : (
          <PlusOutlined />
        )}
      </Upload>
    ),
    file,
  ];
};

export default UploadImg;
