import React from 'react';
import { Switch, Redirect, Router } from 'react-router-dom'
import getRoutes from './router'
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
// import { AppSider, AppHeader } from 'components'
import { history } from 'common/util'
const { Content } = Layout;
//
// userStore
const App = () => {
  const toRedirect = () =>

    renderComponent()


  const renderComponent = () =>
    <Router history={history}>
      <Layout style={{minHeight: '100vh'}}>
        {/* <AppSider />*/}
        <Layout>
          {/* <AppHeader />*/}
          <Layout>
            <Content>
              <Switch>
                {getRoutes}
                <Redirect exact from='/' to='/not' />
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
