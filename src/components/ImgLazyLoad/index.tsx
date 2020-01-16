import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { IImgLazyLoad } from './interface';

/**
 * 图片加载组件
 * @param param0 
 */
const ImgLazyLoad = ({ width, height, imgSrc, loadingSize }: IImgLazyLoad) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    let img = new Image();
    img.src = imgSrc;
    img.onload = () => setIsSuccess(true);
  });
  return (
    (isSuccess && <img src={imgSrc} alt="" width={width} height={height} />) || (
      <Icon type="loading" style={{ fontSize: `${loadingSize}px` }} />
    )
  );
};

export default ImgLazyLoad;
