import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
import menuList from '../../router';
import { IRouter } from '@/interface/Router';
import router from 'umi/router';
import styles from './index.less';
const { SubMenu } = Menu;

/**
 * 侧边菜单
 */
const SlideMenu = (props: any) => {
  const {
    location: { pathname },
  } = props;

  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([pathname]); // 当前的菜单项
  const [openKeys, setOpenKeys] = useState<Array<string>>([]); // 当前打开的菜单组

  useEffect(() => {
    const subMenuKey: string | null = pathname.match(/\/server\/(\S+)\//);
    setOpenKeys(subMenuKey ? [subMenuKey[1]] : []);
  }, [pathname]);

  /**
   * 导航菜单切换
   * @param openKeys
   */
  const subMenuChange = (openKeys: Array<string>) => {
    setOpenKeys(openKeys);
  };

  /**
   * 菜单点击
   * @param param0
   */
  const menuItemClick = ({ key }: { key: string; item: any }) => {
    setSelectedKeys([key]);
    router.push(key);
  };

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
  const SubMenuItem = (data: IRouter) => {
    return (
      <SubMenu
        key={data.key}
        title={
          <span>
            {data.icon && <Icon type={data.icon} />}
            <span>{data.title}</span>
          </span>
        }
      >
        {data.children?.map((item: IRouter) => MenuItem(item))}
      </SubMenu>
    );
  };

  return (
    <Menu
      openKeys={openKeys}
      mode="inline"
      className={styles.slideMenuWrapper}
      onClick={menuItemClick}
      selectedKeys={selectedKeys}
      onOpenChange={subMenuChange}
    >
      {menuList.map((item: IRouter) => {
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
