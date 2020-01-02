import React from 'React';
import { Layout, Icon, Badge, Button } from 'antd';

import logo from '../../images/logo.png';
import styles from './index.less';
const { Header } = Layout;

interface HeaderComInterFace {
  badgeCount: number;
}

const HeaderCom = ({ badgeCount }: HeaderComInterFace) => {

  return (
    <Header className={styles.headerWrapper}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.workspace}>
        <Badge count={badgeCount} className={styles.prompt} offset={[-2, 7]}>
          <Icon type="bell" />
        </Badge>
        <div className={styles.userExplain}>
          <Icon type="smile" theme="filled" />
          <p className={styles.userName}>15901749275</p>
          <Icon type="caret-down" theme="filled" />
          <div className={styles.userInfoWrapper}>
            <div className={styles.userInfoContainer}>
              <Icon type="smile" theme="filled" />
              <ul>
                <li>
                  <span className={styles.label}>用户名: </span>
                  <span className={styles.value}>always</span>
                </li>
                <li>
                  <span className={styles.label}>手机号: </span>
                  <span className={styles.value}>15901749275</span>
                </li>
              </ul>
            </div>

            <Button size="small" type="danger">
              退出
            </Button>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderCom;
