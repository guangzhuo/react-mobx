import React from 'react'
import styles from './index.module.less'

const HeaderTitle = (props:{title:string}) => (
  <div className={styles.wrap}>
    {props.title}
  </div>
)

export default HeaderTitle
