import {observable, action} from 'mobx';
import {setPathValue} from 'pathval';

class LayOutStore {
  
    // constructor() {
    //   makeAutoObservable(this)
    // }

    @observable defaultSettings = {
        navTheme: 'dark', // theme for nav menu
        primaryColor: '#1890FF', // primary color of ant design
        layout: 'sidemenu', // nav menu position: sidemenu or topmenu
        contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
        fixedHeader: false, // sticky header
        autoHideHeader: false, // auto hide header
        fixSiderbar: false, // sticky siderbar
        menu: {
            disableLocal: false,
        },
        title: 'Ant Design Pro',
        pwa: true,
        // Your custom iconfont Symbol script Url
        // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
        // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
        // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
        iconfontUrl: '',
    }
    // 菜单栏宽度
    @observable navBarwidth = '215px';
    // 内容宽度
    @observable mainwidth = ''
    // 侧边栏是否缩小
    @observable menuStatus = false;
    // 焦点数组
    @observable activeArr = [];
    // // 侧边栏主题
    // @observable menuTheme = 'dark'; // 侧边栏主题

    

    @action.bound setValue(path, value) {
        setPathValue(this, path, value);
    }

    // 侧边栏缩小功能
    @action.bound toggleSiber() {
        // console.log(this)
      this.menuStatus=!this.menuStatus
        // console.log(this.menuStatus)
    }
    // 初始化时-侧边栏缩小功能
    @action.bound toggleHideSiber() {
      this.menuStatus=true
    }
    // 初始化时-侧边栏扩大功能
    @action.bound toggleShowSiber(collapsed, type) {
      console.log(type)
      if(collapsed){
        this.menuStatus=true
      } else {
        this.menuStatus=false
      }
    }
  
    // 侧边栏默认焦点
    @action.bound defaultHin (data) {
    if (process.browser && data) {
      const defaultActive = window.location.pathname
      data.forEach((item) => {
        if (item.highlightRoute && item.highlightRoute.length > 0) {
          item.highlightRoute.forEach((highItem) => {
            if (highItem === defaultActive) {
              this.activeArr.push(highItem)
            }
          })
        }
        if (item.child.length > 0) {
          this.defaultHin(item.child)
        }
      })
    }
  }
}

export default new LayOutStore();
