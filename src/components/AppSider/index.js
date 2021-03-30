import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react';
import { Layout, Menu, Modal } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import { history } from 'common/util';
import { TeamOutlined } from '@ant-design/icons';

import styles from './index.module.less';
import logo from 'images/AppSider/logo.png';

// import * as store from "store";

// const IconFont = IconfontCN();

const { SubMenu } = Menu;
const { Sider } = Layout;


const AppSider = ({layOutStore, userStore}) => {
  // const {layOutStore, userStore } = useContext(MobXProviderContext);
  const { menuStatus,  defaultSettings: { navTheme }, activeArr} = layOutStore;
  const barConfig = [
    {
      link: '/admin/list',
      label: '123XXX管理',
      permissionKey: '',
      icon: 'xxxx',
      highlightRoute: ['/admin/list'],
      child: []
    }
  ];

  useEffect(() => {
    layOutStore.defaultHin(barConfig)
  }, [layOutStore, barConfig])

  // 一级菜单点击
  const menuClick = (item) => {
    if (Number.isFinite(parseInt(item.key, 10))) {
      Modal.error({
        title: '警告',
        content: '当前模块需进一步授权，请联系管理员，添加权限',
      });
    } else {
      history.push(item.key);
    }
  }
  // 二级菜单点击
  const childMenuClick = (item) => {
    // const { count, changeCount} = userStore;

    history.push(item.key);
    layOutStore.toggleSiber()
    userStore.changeCount()
  }

  // 侧边栏默认打开
  const defaultOpen = () => {
    if (process.browser && barConfig) {
      const activeOpenArr = []
      const defaultActive = window.location.pathname
      barConfig.forEach((item) => {
        if (item.child) {
          item.child.forEach((childItem) => {
            if (childItem.link === defaultActive) {
              activeOpenArr.push(item.link)
            }
            if (childItem.highlightRoute && childItem.highlightRoute.length > 0) {
              childItem.highlightRoute.forEach((childHighItem) => {
                if (childHighItem === defaultActive) {
                  activeOpenArr.push(item.link)
                }
              })
            }
          })
        }
      })
      return activeOpenArr
    }
  }

  const renderWithAuth = (permissionKey, renderElement) =>  {
    const user_Permissions = userStore.userInfo.userPermission || {}
    if (!permissionKey || user_Permissions[permissionKey]) {
      return renderElement;
    }
    return null;
  }
  return (
    <Sider
      trigger={null}
      // width='256'
      // breakpoint='md'
      // collapsedWidth={200}
      collapsible
      collapsed={menuStatus}
      theme={navTheme}
      onBreakpoint={(broken) => {
        console.log(broken, 'broken')
        if (broken) {layOutStore.toggleHideSiber()}
      }}
      onCollapse={(collapsed, type) => layOutStore.toggleShowSiber(collapsed, type)}
    >
      <div className={styles.navBarWrap}>
        {/* {genNavbar(barConfig, 1)}className={styles.navWrap} */}
        <div className={styles.logo}>
          {menuStatus
            ? <img className={styles.logoImgClose} src={logo} alt=""/>
            : <>
              <img className={styles.logoImg} src={logo} alt=""/>
              <span>XXXX管理平台</span>
              {/* <IconFont type="iconzhongqinggongjijinkuomianzhinengjuecexitong" className={styles.second} /> */}
            </>
          }
        </div>
        <Menu
          className={styles.siderNarMenu}
          theme={navTheme}
          defaultSelectedKeys={activeArr}
          mode="inline"
          defaultOpenKeys={defaultOpen()}
        >
          {barConfig && barConfig.map((barItem) => {
            if (barItem.child && barItem.child.length === 0) {
              const renderElement = (
                <Menu.Item
                  key={barItem.link}
                  onClick={(Item) => {
                    menuClick(Item)
                  }}
                >
                  {/* <IconFont type={barItem.icon} /> */}
                  <TeamOutlined />
                  <span>{barItem.label}</span>
                </Menu.Item>
              )
              return renderWithAuth(barItem.permissionKey, renderElement);
            }
            if (barItem.child && barItem.child.length !== 0) {
              return (
                <SubMenu
                  key={barItem.link}
                  title={
                    <span>
                      {/* <IconFont type={barItem && barItem.icon} /> */}
                      <TeamOutlined />
                      <span>{barItem.label}</span>
                    </span>
                  }
                >
                  {barItem.child.map((childItem) => {
                    const menuItemChild = <Menu.Item
                      key={childItem.link}
                      onClick={(item) => {
                        childMenuClick(item)
                      }}
                    >
                      {/* <IconFont type={childItem && childItem.icon} />
                        */}
                      <TeamOutlined  />
                      <span>{childItem.label}</span>
                    </Menu.Item>
                    return renderWithAuth(childItem.permissionKey, menuItemChild);
                  })}

                </SubMenu>
              )
            }
            return null
          })}
        </Menu>
      </div>
    </Sider>
  )
}


export default inject('layOutStore', 'userStore')(observer(AppSider));
