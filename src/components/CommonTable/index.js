import React from 'react';
import { Table } from 'antd';

import styles from './index.module.less'



const CommonTable = (props) =>  {
  // console.log(props)
  const {total, current, pageSize, isBorder} = props
    return (
        <Table {...props}
               className={`${styles.tableWrap} ${isBorder ? styles.isBorder: ''}`}
               onChange={(pagination, filters, sorter, extra) => {
                 props.onChange(pagination, filters, sorter, extra)
               }}
               pagination={{
                 showQuickJumper: true,
                 showSizeChanger: true,
                 total: total,
                 pageSize: pageSize,
                 current: current,
                 showTotal:(total) => `共${total}条记录 第${current}/${Math.ceil(total/pageSize)}页`
            }}
        />
    );
}

React.defaultProps = {
  total: 0,
  current: 1,
  pageSize: 10
}

export default CommonTable;