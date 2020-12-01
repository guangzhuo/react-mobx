import React, { Component } from 'react';
import { Breadcrumb } from 'antd';


import styles from './index.module.less';



class Maintitle extends Component {
  componentDidMount() {

  }

  render() {
    const { items } = this.props
    return (
      <div className={styles.mainTitle}>
        <div className={styles.header}>
          <Breadcrumb separator=">">
            {items.map((item) => {
              if (!item.href) {
                return (
                  <Breadcrumb.Item key={item.id}>{item.name}</Breadcrumb.Item>
                )
              }
              return (
                <Breadcrumb.Item key={item.id} href={item.href}>{item.name}</Breadcrumb.Item>
              )
            })}
          </Breadcrumb>
        </div>
      </div>
    );
  }
}

export default Maintitle;
