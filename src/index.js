import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import * as store from './store';
// import axios from 'axios';
import {ConfigProvider, 
  // message
} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import {login} from 'apis';
// import {userStore} from './store/index'
moment.locale('zh-cn');


// const renderDOM = () => {
//   return ReactDOM.render(
//     <Provider {...store}>
//       <ConfigProvider locale={zhCN}>
//         <App />
//       </ConfigProvider>
//     </Provider>,
//     document.getElementById('root')
//   );
// }

  // login()
  // .then((res) => {
  //   const {data} = res.data
  //   // data.userPermission = {
  //   //   HTGL01: true,
  //   // }
  //   // userStore.setValue('userInfo', data)
  //   renderDOM()
  // }).catch((error) => {
  //   // test
  //   const data = {
  //     userPermission:{HTGL01: true}
  //   }
  //   userStore.setValue('userInfo', data)
  //   if(error.response) message.error(error.response.data.message);
  // })


ReactDOM.render(
  <Provider {...store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
