import React, { useEffect } from 'react'
import { inject, observer, IReactComponent } from 'mobx-react';
// import {toJS} from 'mobx'
import { Layout, Menu, Modal } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import { history } from 'common/util';
import { TeamOutlined } from '@ant-design/icons';

import styles from './index.module.less';
import logo from 'images/AppSider/logo.png';
import {MenuInfo} from 'rc-menu/lib/interface';

// import * as store from "store";

// const IconFont = IconfontCN();

const {SubMenu} = Menu;
const {Sider} = Layout;

interface ILayStore {
  menuStatus: boolean,
  activeArr: any[],
  defaultSettings: { navTheme: any }
  // eslint-disable-next-line no-unused-vars
  defaultHin(arg: any): () => void
  toggleSiber(): () => void
  toggleHideSiber(): () => void
  // eslint-disable-next-line no-unused-vars
  toggleShowSiber(collapsed: boolean, type: 'clickTrigger' | 'responsive'): () => void
}

interface IUserStore {
  userInfo:any
  changeCount(): () => void
}

interface IProps {
  layOutStore: IReactComponent & ILayStore,
  userStore: IReactComponent & IUserStore
}

// interface IItem{
//   key:string,
//   userInfo:any
// }

const AppSider = ({layOutStore, userStore}: IProps) => {
  // const {layOutStore, userStore } = useContext(MobXProviderContext);
  const {menuStatus, defaultSettings: {navTheme}, activeArr} = layOutStore;
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
    console.log(layOutStore)
    layOutStore.defaultHin(barConfig)
  }, [layOutStore, barConfig])

  // 一级菜单点击
  const menuClick = (item: MenuInfo) => {
    if (Number.isFinite(parseInt(String(item.key as number), 10))) {
      Modal.error({
        title: '警告',
        content: '当前模块需进一步授权，请联系管理员，添加权限',
      });
    } else {
      history.push(item.key as string);
    }
  }
  // 二级菜单点击
  // eslint-disable-next-line no-undef
  const childMenuClick = (item: MenuInfo) => {
    // const { count, changeCount} = userStore;

    history.push(item.key as string);
    layOutStore.toggleSiber()
    userStore.changeCount()
  }

  // 侧边栏默认打开
  const defaultOpen = () => {
    if (barConfig) {
      const activeOpenArr: string[] = []
      const defaultActive = window.location.pathname
      barConfig.forEach((item) => {
        if (item.child) {
          item.child.forEach((childItem) => {
            // @ts-ignore
            if (childItem.link === defaultActive) {
              activeOpenArr.push(item.link)
            }
            // @ts-ignore
            if (childItem.highlightRoute && childItem.highlightRoute.length > 0) {
              // @ts-ignore
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

  const renderWithAuth = (permissionKey:string, renderElement:React.ReactNode) =>  {
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
                  {barItem.child.map((childItem:{link:string;label:string}) => {
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
                    // @ts-ignore
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
