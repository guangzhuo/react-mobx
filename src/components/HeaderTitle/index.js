import React from 'react'
import styles from './index.module.less'

const HeaderTitle = (props) => (
  <div className={styles.wrap}>
    {props.title}
  </div>
)

export default HeaderTitle
