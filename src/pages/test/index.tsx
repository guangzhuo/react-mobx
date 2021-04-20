import React, { FC, useEffect } from 'react'
import { inject, observer, IReactComponent } from 'mobx-react'
import Quill from 'components/Business/Quill'

// import styles from './index.module.less'

interface IFc {
  userStore: IReactComponent
}

const Index: FC<IFc> = ({ userStore }: IFc) => {
  console.log(userStore)
  useEffect(() => {
    console.log(1)
  }, [])

  return (
    <div>
      <Quill />
    </div>
  )
}

export default inject('userStore')(observer(Index))
