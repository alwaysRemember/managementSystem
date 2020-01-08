import React, { useState } from 'react';
import { Menu, Icon } from 'antd';
import { IRoute } from 'umi-types';
import menuList from '../../router';
import { IRouter } from '@/interface/Router';
import router from 'umi/router';
import styles from './index.less';
const { SubMenu } = Menu;

/**
 * 菜单项
 * @param data
 */
const MenuItem = (data: IRouter) => {
  if (data.children) {
    return SubMenuItem(data);
  } else {
    return (
      <Menu.Item key={data.path}>
        {data.icon && <Icon type={data.icon} />}
        <span>{data.title}</span>
      </Menu.Item>
    );
  }
};

/**
 * 下拉菜单
 * @param data
 */
const SubMenuItem = (data: Router) => {
  return (
    <SubMenu
      key={`${data.title}_${Math.random() * 10}`}
      title={
        <span>
          {data.icon && <Icon type={data.icon} />}
          <span>{data.title}</span>
        </span>
      }
    >
      {data.children?.map((item: Router) => MenuItem(item))}
    </SubMenu>
  );
};

/**
 * 侧边菜单
 */
const SlideMenu = (props: any) => {
  const {
    location: { pathname },
  } = props;

  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const menuItemClick = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    router.push(key);
  };
  return (
    <Menu
      mode="inline"
      className={styles.slideMenuWrapper}
      onClick={menuItemClick}
      selectedKeys={selectedKeys}
    >
      {menuList.map((item: Router) => {
        if (item.children) {
          return SubMenuItem(item);
        } else {
          return MenuItem(item);
        }
      })}
    </Menu>
  );
};

export default SlideMenu;
