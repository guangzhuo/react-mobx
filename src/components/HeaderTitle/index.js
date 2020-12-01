import React from 'react'
import styles from './index.module.less'

const HeaderTitle = (props) => {
  return (
    <div className={styles.wrap}>
      {props.title}
    </div>
  )
}

export default HeaderTitle