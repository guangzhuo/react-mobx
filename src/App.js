import React from 'react';
import { Switch, Redirect, Router } from 'react-router-dom'
import getRoutes from './router'
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { AppSider, AppHeader } from 'components'
import { history } from 'common/util'
const { Content } = Layout;


// userStore
const App = () => {
  const toRedirect = () =>
  // 权限
  // const mapList = {
  //   'HTGL01': '/admin/list',
  // }
  // const url = window.location.pathname
  // const mapKeys = Object.keys(mapList)
  // const {userInfo:{userPermission}} = userStore
  // let firstUrl = mapKeys.find(first=> userPermission[first])
  // console.log(firstUrl)
  // // 没权限 又在404页面 render
  // if(!firstUrl && url === '/404') {
  //   return renderComponent()
  // }
  // 所有的没权限走404
  // if(!firstUrl) {
  //   // userStore.setValue('toHref', '/404')
  //   window.location.href =`${window.location.origin}/404`
  //   return renderComponent()
  // }
  // // 在404页面 但是给了权限
  // if(url === '/404' && firstUrl) {
  //   window.location.href = `${window.location.origin}${mapList[firstUrl]}`
  //   return
  // }
  // 当前路由 没权限时，跳到默认第一个有权限的路由下
  // mapKeys.forEach(rep => {
  //   if((url !== '/404' && url === mapList[rep] && !userPermission[rep]) || url === '/') {
  //     // toHref
  //     // console.log(mapList[firstUrl])
  //     userStore.setValue('toHref', mapList[firstUrl])
  //     window.location.href = `${window.location.origin}${mapList[firstUrl]}`
  //   }
  // })

    renderComponent()


  const renderComponent = () =>
    // const {toHref} = userStore
    <Router history={history}>
      <Layout style={{minHeight: '100vh'}}>
        <AppSider />
        <Layout>
          <AppHeader />
          <Layout>
            <Content style={{background: '#F1F4F6'}}>
              <Switch>
                {getRoutes}
                <Redirect exact from='/' to='/admin/list' />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>


  return (
    <>
      {toRedirect()}
    </>
  )
}

export default inject('userStore')(observer(App));
// export default App;
