import React, { FC, useEffect } from 'react'
import { inject, observer, IReactComponent } from 'mobx-react'

// import styles from './index.module.less'

interface IFc {
  UserStore: IReactComponent
}

const Index: FC<IFc> = ({ UserStore }: IFc) => {
  console.log(UserStore)
  useEffect(() => {
    console.log(1)
  }, [])

  return (
    <div>
      <div>1232</div>
    </div>
  )
}

export default inject('UserStore')(observer(Index))
