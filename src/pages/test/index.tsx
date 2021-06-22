import React, { FC, useEffect } from 'react'
import { inject, observer, IReactComponent } from 'mobx-react'
import Quill from 'components/Business/Quill'

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
      <Quill />
    </div>
  )
}

export default inject('UserStore')(observer(Index))
