import React, { Component } from 'react';
import styles from './index.module.less';


class TableWrap extends Component {
  componentDidMount() {

  }


  render() {
    const {rightSlot, children} = this.props
    return (
      <div className={styles.TableWrap}>
        <div className={styles.flexAli}>
          <div className={styles.mainTitleWrap}>
            <div className={styles.tableTitle}>{this.props.title}</div>
            <div className={styles.right}>
              <div className={styles.rightSlot}>
                {rightSlot}
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default TableWrap;
