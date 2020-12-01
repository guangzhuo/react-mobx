import React from 'react';
import { observer, inject} from 'mobx-react';
// import { toJS } from 'mobx';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import moment from "moment";
import horn from 'imgs/AppSider/horn.png';
import styles from './index.module.less';

const { Header } = Layout;

const AppHeader = ({userStore, layOutStore}) => {
    // const {layOutStore, userStore } = useContext(MobXProviderContext);
  const {menuStatus} = layOutStore
  const {userInfo} = userStore
  return (
    <div className={styles.appHeaderWrap}>
      <Header>
       <div className={styles.wrap}>
         <div className={styles.flexWrap}>
           <div className={styles.iconWrap}>
             {
               menuStatus ?
                 <MenuUnfoldOutlined
                   className={`trigger ${styles.icoStyle}`}
                   onClick={()=>layOutStore.toggleSiber()} />
                   :
                 <MenuFoldOutlined
                   className={`trigger ${styles.icoStyle}`}
                   onClick={()=>layOutStore.toggleSiber()} />
             }
           </div>
           <div className={styles.loginInfo}>
              <div className={styles.horn}>
                <img src={horn} alt=""/>
              </div>
               <div className={styles.loginWelcome}>
                 {`尊敬的用户${userInfo.name} ，欢迎登录 ~`}
               </div>
               <div className={styles.loginTime}>
                 {`上次登录时间：${moment(userInfo.lastLoginTs).format('YYYY-MM-DD')}` }
               </div>
           </div>
           <div className={styles.userLogo}>
             <div className={styles.crice}></div>
             <div className={styles.username}>{userInfo.name}</div>
           </div>
         </div>
       </div>
      </Header>
    </div>
  );
}
// inject('userStore', 'layOutStore')
// (observer(()))
export default withRouter(inject('userStore', 'layOutStore')(observer(AppHeader)));