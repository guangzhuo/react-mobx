import React, { FC, useEffect } from 'react'
// import {LockOutlined} from '@ant-design/icons';
import { inject, observer, IReactComponent } from 'mobx-react'
import notFound from 'images/notFound/notFound.png'
import styles from './index.module.less'

interface IUserinfo {
  userInfo: {
    id: number
    name: string
  }
  login(): () => void
}

interface IFc {
  UserStore: IReactComponent & IUserinfo
}
const NotFound: FC<IFc> = ({ UserStore }: IFc) => {
  const { userInfo, login } = UserStore
  const { id, name } = userInfo
  console.log(id)
  console.log(name)
  useEffect(() => {
    UserStore?.login()
  }, [])

  return (
    <div className={styles.notFound}>
      <div className={styles.imgWrap}>
        (
        <img
          onClick={() => login()}
          src={notFound}
          className={styles.notImg}
          alt="您访问的页面未授权"
        />
        )<div className={styles.ft}>您访问的页面未授权～ 请联系管理员！</div>
      </div>
    </div>
  )
}

export default inject('UserStore')(observer(NotFound))
