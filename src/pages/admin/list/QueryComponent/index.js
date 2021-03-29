import React from 'react';
import { Input, Button, Select, Row, Col, Form, DatePicker } from 'antd';
import { observer, inject } from 'mobx-react';
// import { toJS } from 'mobx';
import moment from 'moment';
import styles from './index.module.less';
import validator from 'common/util/validator';


const { Option } = Select;
const { RangePicker } = DatePicker;

function QueryComponent ({  listStore }) {
  const [form] = Form.useForm();
  const {account: {areaList}} = listStore;

  listStore.setValue('account.searchForm', form)

  // 布局
  const formItemLayout = {
    labelCol: {
      span: 7
    },
    wrapperCol: {
      span: 17
    },
  };
  const xxlSize = {
    md: 6,
    xs: 12
  }
  const disabledDate = (current) => current && current > moment().endOf('day')

  // 提交
  const onFinish = (values) => {
    const {lastModifiedTs} = values
    const startTime = lastModifiedTs && moment(values.lastModifiedTs[0]).format('YYYY-MM-DD')
    const lastTime = lastModifiedTs && moment(values.lastModifiedTs[1]).format('YYYY-MM-DD')
    delete values.lastModifiedTs
    values.activationTsStart = startTime
    values.activationTsEnd = lastTime
    // queryData
    listStore.setValue('queryData', values)
    listStore.getListData()
  }

  const validatorPhone = (rule, value, callback) => {
    if (value) {
      const { isMobile } = validator
      const msg = isMobile(value, { msg: '请输入正确的手机格式' })
      if (msg) {
        callback(true);
      }
    }
    callback();
  }
  return (
    <Form
      onFinish={onFinish}
      form={form}
      className={styles.queryComponent}>
      <Row type="flex">
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="账号"
            name='account'
            // initialValue={queryData.account || undefined}
            // rules={[{
            //   validator: validatorPhone, message: '请输入正确格式的账号'
            //   }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="姓名"
            name='username'
            // initialValue={queryData.userName || undefined}
            // rules={[{
            //   pattern: '^[\u4e00-\u9fa5a-zA-Z0-9]{2,50}$',
            //   message: '输入汉字、英文、数字2-50个字',
            // }]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="性别"
            name='gender'
            initialValue={''}
          >
            <Select
              placeholder='请选择性别'
            >
              <Option value=''>全部</Option>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="状态"
            name='userStatus'
            initialValue={''}
          >
            <Select placeholder='请选择状态'>
              <Option value=''>全部</Option>
              <Option value="ENABLED">启用</Option>
              <Option value="DISABLED">禁用</Option>
              <Option value="FORBIDDEN">待激活</Option>
              {/* <Option value="CLOSED">已注销</Option>*/}
            </Select>
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="管辖区域"
            name='area'
            initialValue={''}
            // initialValue={queryData.scfProvince || account.isArea || undefined}
          >
            <Select placeholder='请选择管辖区域'>
              <Option key='全部' value={''}>全部</Option>
              {areaList && areaList.map((obj) => <Option key={obj.value} value={obj.value}>{obj.name}</Option>)}
            </Select>
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="联系方式"
            name='contact'
            // initialValue={queryData.phone || undefined}
            rules={[{
              validator: validatorPhone, message: '请输入正确的联系方式'
            }]}
          >
            <Input placeholder="请输入联系方式" />
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="绑定角色"
            name='roleName'
            // initialValue={queryData.roles || ''}
          >
            <Input placeholder="请输入角色" />
          </Form.Item>
        </Col>
        <Col {...xxlSize}>
          <Form.Item
            {...formItemLayout}
            label="激活时间"
            name='lastModifiedTs'
            // initialValue={ queryData.activeTime || undefined }
          >
            <RangePicker style={{width: '100%'}} disabledDate={disabledDate}  />
          </Form.Item>
        </Col>


        {/* 占位 */}
        <>
          <Col {...xxlSize}>
            <Form.Item
              {...formItemLayout}
              label=""
              className={styles.mrginNone}
            >
            </Form.Item>
          </Col>
          <Col {...xxlSize}>
            <Form.Item
              {...formItemLayout}
              label=""
              className={styles.mrginNone}
            >
            </Form.Item>
          </Col>
          <Col {...xxlSize}>
            <Form.Item
              {...formItemLayout}
              label=""
              className={styles.mrginNone}
            >
            </Form.Item>
          </Col>
        </>

        <Col {...xxlSize}>
          <Form.Item className={styles.mrginNone}>
            <div className={styles.allbutton}>
              <Button className={styles.button} htmlType="submit" type="primary">查询</Button>
              <Button onClick={() => listStore.reset()} >重 置</Button>
              {/* <a onClick={packUpFn}>{packUp ? '展开' : '收起'}<Icon type="up" className={`${styles.packUp} ${packUp && styles.packDown}`} /></a>*/}
            </div>
          </Form.Item>
        </Col>
      </Row>

    </Form>
  );
}

export default inject('listStore')(observer(QueryComponent));
