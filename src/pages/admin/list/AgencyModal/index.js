import React from 'react';
import {Form, TreeSelect,
  // Select,
  Input} from 'antd';

import styles from './index.module.less';
import {treeDataFormate} from 'common/util';
import {toJS} from 'mobx';
import {inject, observer} from 'mobx-react';

// const { Option } = Select;
const { TextArea } = Input;

const AgencyModal = ({listStore}) => {

  const {account: {treeData}} = listStore

  return (
    <div className={styles.AgencyModal}>
      <Form.Item
        label="tree名称"
        name='name'
        rules={[{required: true, message: 'tree名称不能为空'}]}
      >
        <Input placeholder='请输入tree名称' />
      </Form.Item>
      <Form.Item label="所属tree"
        name='orgName'
        rules={
          [{required: true, message: '所属tree不能为空'}]
        }>
        <TreeSelect
          placeholder="请选择所属tree"
          treeData={treeDataFormate(toJS(treeData))}
        />
      </Form.Item>
      <Form.Item label="tree描述"
        name='description'>
        <TextArea className={styles.textarea}
          maxLength={100}
          autoSize={false}
          placeholder='请输入不超过100个字符' />
      </Form.Item>
      {/* <Form.Item label="状态" name='status' initialValue={1}>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>警用</Radio>
          </Radio.Group>
        </Form.Item>*/}

    </div>
  );
}

export default inject('listStore', 'userStore')(observer(AgencyModal));
