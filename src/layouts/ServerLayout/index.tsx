import React from 'react';
import { Layout } from 'antd';

import Header from '../../components/Header';
import SlideMenu from '../../components/SlideMenu';

import styles from './index.less';

const ServerLayout = (props: any) => {
  
  return (
    <Layout className={styles.serverLayoutWrapper}>
      {/* 头部 */}
      <Header badgeCount={2} />
      <Layout className={styles.serverLayoutContainer}>
        {/* 侧边栏 */}
        <Layout className={styles.serverLayoutSlide}>
          <SlideMenu {...props} />
        </Layout>
        {/* 主体 */}
        <Layout className={styles.serverLayoutChildren}>{props.children}</Layout>
      </Layout>
    </Layout>
  );
};

export default ServerLayout;
