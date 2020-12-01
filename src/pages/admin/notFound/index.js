import React from 'react';
// import {LockOutlined} from '@ant-design/icons';
import notFound from 'imgs/notFound/notFound.png';
import styles from './index.module.less';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.imgWrap}>
        <img src={notFound} className={styles.notImg} alt='您访问的页面未授权' />
        <div className={styles.ft}>您访问的页面未授权～ 请联系管理员！</div>
      </div>
      
    </div>
  );
};

// NotFound.propTypes = {
//
// };

export default NotFound;