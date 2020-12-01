import React  from 'react';
import {
  Form,
  TreeSelect,
  Select,
  // Input,
  // Radio
} from 'antd';

import styles from './index.module.less';
import {treeDataFormate} from 'common/util';
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";

const { Option } = Select;
// const { TextArea } = Input;

const AccountModal = ({listStore}) => {
  const {account: {treeData, roleList, areaList}} = listStore
  
 
    return (
      <div className={styles.AgencyModal}>
  
        <Form.Item label="所属tree"
                   name='orgId'
                   rules={
                     [{required:true, message:'所属tree不能为空'}]
                   }>
          <TreeSelect
            placeholder="请选择所属tree"
            treeData={treeDataFormate(toJS(treeData))}
          />
        </Form.Item>
        
        <Form.Item
        label="绑定角色"
        name='roleId'
        rules={[{required:true, message:'角色不能为空'}]}
      >
          <Select
            placeholder='请绑定角色'
          >
            {roleList&&roleList.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)}
          </Select>
      </Form.Item>
        
        
        {/*<Form.Item
          label="状态"
          name='userStatus'
          initialValue={'DISABLED'}
          rules={[{required:true, message:'状态不能为空'}]}
        >
          <Radio.Group>
            <Radio value='ENABLED'>启用</Radio>
            <Radio value='DISABLED'>禁用</Radio>
          </Radio.Group>
        </Form.Item>
  */}
        <Form.Item
          label="管理辖区"
          name='areas'
          rules={[{required:true, message:'管理辖区不能为空'}]}
        >
          <Select
            mode="multiple"
            placeholder='请选择管理辖区'
          >
            {areaList&&areaList.map(obj => <Option key={obj.value} value={obj.value}>{obj.name}</Option>)}
          </Select>
        </Form.Item>
      </div>
    );
}

export default inject('listStore', 'userStore')(observer(AccountModal));