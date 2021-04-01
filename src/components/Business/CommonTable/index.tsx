import React from 'react';
import { Table } from 'antd';
import styles from './index.module.less'

interface Iprops {
  total: number,
  current: number,
  pageSize: number,
  isBorder?: boolean,
  [key:string]: any
}
const CommonTable = (props:Iprops) =>  {
  // console.log(props)
  const {total, current, pageSize, isBorder} = props
  return (
    <Table {...props}
      className={`${styles.tableWrap} ${isBorder ? styles.isBorder : ''}`}
      onChange={(pagination, filters, sorter, extra) => {
        props.onChange(pagination, filters, sorter, extra)
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        total: total,
        pageSize: pageSize,
        current: current,
        showTotal: (total) => `共${total}条记录 第${current}/${Math.ceil(total / pageSize)}页`
      }}
    />
  );
}

export default CommonTable;
