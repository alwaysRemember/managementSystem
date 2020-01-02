import React from 'react';

import Header from '../../components/Header';

import styles from './index.less';

const ServerLayout = (props: any) => {
  return (
    <div className={styles.serverLayoutWrapper}>
      <Header badgeCount={2} />
      {props.children}
    </div>
  );
};

export default ServerLayout;
