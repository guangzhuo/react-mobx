import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Tree, Tooltip, Modal,Form, Button, Space, Badge } from 'antd';
import { PlusOutlined,FormOutlined, CloseOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import { toJS } from 'mobx';
import MainTitle from 'components/mainTitle';
import KeyWordsWrap from 'components/KeyWordsWrap';
import TableWrap from 'components/TableWrap';
import CommonTable from 'components/CommonTable';
import QueryComponent from './QueryComponent';
import AgencyModal from './AgencyModal';
import AccountModal from './AccountModal';
import {GetAreas} from 'common/hooks';

import {treeDataFormate} from 'common/util';

import styles from './index.module.less';

const { Search } = Input;
// const { TreeNode } = Tree;

const BreadcrumbData = [
  { href: '', name: 'XXXXXX系统', id: 1 },
  { href: '/admin/backstageUserList', name: 'XXX管理', id: 2 },
]

const statusName = {
  'DISABLED': {status: 'error', text: '已禁用'},
  'ENABLED':  {status: 'success', text: '已启用'},
  'FORBIDDEN': {status: 'default', text: '待激活'},
  'CLOSED': {status: 'default', text: '已注销'}
}
function BSUserList({ listStore, userStore }){
  const [form] = Form.useForm()
  const {
    listData,
    pagination,
    requestLoading,
    account,
    leftDepartExpandKeys,
    searchInputValue,
    // pushURL,
  } = listStore;
  const { treeData, typeTitle, showModel, modelType } = account
  const {userInfo:{userPermission}} = userStore
  listStore.setFrom(form)
  // 获取绑定角色
  // let roleDta = null
  // const roleDta = GetRoles(null)
  // 获取管辖区域数据
  const areaData = GetAreas(null)
  useEffect(()=>{
    // listStore.setValue('account.roleList', roleDta)
    listStore.setValue('account.areaList', areaData)
  }, [listStore, areaData])
  
  useEffect(() => {
    // listStore.getListData()
    // listStore.getAccountTree()
    // 卸载
    return () => {
      listStore.resetStore()
    }
  },[listStore])
  
  
  const handleSearchChange = e => {
    // console.log(e.target.value)
    listStore.setValue('searchInputValue', e.target.value)
    // pushURL()
  };
  
  //  左侧Tree title组件
  const returnIcon = (item) => {
    // enum {
    //ROOT("根节点结构"),
    // MODIFIED("默认tree"),
    // NORMAL("普通tree"),
    // }
  
    // OrgType orgType
    // Boolean accountExist
    // Integer level
    
    // (item.orgType === 'ROOT' || item.orgType !== 'MODIFIED') || item.level > 3
    const isAdd = () => {
      if(userPermission&&!userPermission.HTGL010101) return false
      if(item.orgType !== 'ROOT' && item.orgType !== 'NORMAL') {
        return false
      }
      if(item.level > 4) {
        return false
      }
      if(item.orgType === 'MODIFIED') {
        return false
      }
      return true
    }
    
    const isEdit = userPermission&&userPermission.HTGL010102&&item.orgType !== 'MODIFIED'
    
    const isDelete = () => {
      if(userPermission&&!userPermission.HTGL010103) return false
      if(item.orgType === 'ROOT') {
        return false
      }
      if(item.orgType === 'MODIFIED') {
        return false
      }
      if(item.accountExist) {
        return false
      }
      // if(item.level > 3) {
      //   return false
      // }
      return true
    }
    return (
      <div className={styles.wrapIcon}>
        <span onClick={() => listStore.treeClick(item)} className={styles.ellipsis} title={item.name}>
            {item.name}
        </span>
        {
          isAdd() &&
        <React.Fragment>
          {<PlusOutlined onClick={() => listStore.typeShowModel(item, 'add')} style={{ marginLeft: '3px' }} />}
        </React.Fragment>
        }
        {
          isEdit &&
          <FormOutlined onClick={() => listStore.typeShowModel(item, 'edit')} style={{ margin: '0 6px' }} />
        }
        
        {
          isDelete() &&
          <React.Fragment>
            <CloseOutlined onClick={() => deleteTree(item, 'delete')} />
          </React.Fragment>
        }
      </div>
    )
  }
  
  // 显示弹窗对应的组件
  const showFormItem = () => {
    switch (modelType) {
      case 'add':
      case 'edit':
       return <AgencyModal />;
      case 'activating':
      case 'activatingEdit':
        return <AccountModal />
      default:
        break;
    }
  }
  
  //  启用
  /*const openAccunt = (record) => {
    // enabledAccount
    Modal.confirm({
      title: '启用提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定继续启用？',
      cancelText: '取消',
      okText: '确认',
      onOk:() => {listStore.enabledAccount(record)}
    });
  }*/
  // 停用
  /*const stopAccunt = (record) => {
    Modal.confirm({
      title: '停用提示',
      icon: <ExclamationCircleOutlined />,
      content: '当前账户有未完成的扩面任务，确定继续停用？',
      okText: '确认',
      cancelText: '取消',
      onOk:() => {listStore.disabledAccunt(record)}
    });
  }*/
  
  // 删除
  const deleteTree = (item) => {
    console.log(item.id)
    Modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定删除？',
      okText: '确认',
      cancelText: '取消',
      onOk:() =>{listStore.deleteOk(item)}
    });
  }
  
  // 弹窗里 数据
  const onFinish = (valus) => {
    switch (modelType) {
      case 'add':
        listStore.addDept(valus)
        break
      case 'edit':
        listStore.edit(valus)
        break
      case 'activating':
        listStore.activeAccount(valus)
        break
      case 'activatingEdit':
        listStore.editAccount(valus)
        break
      default:
        break;
    }
  }
  
  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'left',
      render: (text, record, index) => index + 1
    }, {
      title: '账号',
      dataIndex: 'account',
      align: 'left',
      render: (text, record,) => {
        return (
          <Tooltip title={record.account}>
            <div className={styles.ellipseOver}>
              {record.account || '--'}
            </div>
          </Tooltip>
        )
      }
    }, {
      title: '姓名',
      dataIndex: 'username',
      align: 'left',
      render: (text, record,) => {
        return (
          <Tooltip title={record.username}>
            <div className={styles.ellipseOver}>
              {record.username || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      align: 'left',
      render: (text, record,) => {
        return (
          <Tooltip title={record.gender}>
            <div className={styles.ellipseOver}>
              {record.gender || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '所属tree',
      dataIndex: 'orgName',
      align: 'left',
      render: (text, record) => {
        return (
          <Tooltip title={record.orgName}>
            <div className={styles.ellipseOver}>
              {record.orgName || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      align: 'left',
      render: (text, record) => {
        return (
          <Tooltip title={statusName[record.userStatus].text}>
            <div className={styles.ellipseOver}>
              <Badge status={statusName[record.userStatus].status}
                     className={styles.posi} />
              {(statusName[record.userStatus].text) || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '管辖区域',
      dataIndex: 'areas',
      align: 'left',
      render: (text, record) => {
        return (
          <Tooltip title={record.areas&&record.areas.join(',')}>
            <div className={styles.ellipseOver}>
              {(record.areas&&record.areas.join(',')) || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      align: 'left',
      render: (text, record) => {
        return (
          <Tooltip title={record.contact}>
            <div className={styles.ellipseOver}>
              {record.contact || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '绑定角色',
      dataIndex: 'role',
      align: 'left',
      render: (text, record,) => {
        return (
          <Tooltip title={record.roleName}>
            <div className={styles.ellipseOver}>
              {record.role || '--'}
            </div>
          </Tooltip>
        )
      }
    },{
      title: '激活时间',
      dataIndex: 'lastModifiedTs',
      align: 'left',
      render: (text, record,) => {
        return (
          <Tooltip title={record.lastModifiedTs}>
            <div className={styles.ellipseOver}>
              {record.lastModifiedTs || '--'}
            </div>
          </Tooltip>
        )
      }
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'left',
      render: (text, record) => (
        <React.Fragment>
          <div className={styles.operatingTable}>
            {userPermission&&userPermission.HTGL0104&&
              <span onClick={()=>listStore.typeShowModel(record, 'activatingEdit')} > 编辑 </span>
            }
            
            {
              userPermission&&userPermission.HTGL0103 &&
              record.userStatus === 'FORBIDDEN' &&
                <>
                  <span style={{color: '#e8e8e8'}}> | </span>
                  <span onClick={()=>listStore.typeShowModel(record, 'activating')}>激活</span>
                </>
              
            }
            
         {/*
            {record.userStatus !== 'ENABLED' &&
            <span onClick={()=>openAccunt(record)}> 启用 |</span> }
            {
              record.userStatus !== 'DISABLED' &&
              <span onClick={()=>stopAccunt(record)}>停用 </span>
            }*/}
            
          </div>
        </React.Fragment>
      ),
    }
  ];
  
  return (
    <div className={styles.userList}>
      <MainTitle items={BreadcrumbData} title='XXX管理' />
      <KeyWordsWrap>
        <QueryComponent />
      </KeyWordsWrap>
      
      <TableWrap title='查询表格'>
        <div className={styles.flexBace}>
          {
            <div className={styles.leftSmallBar}>
            <Search value={searchInputValue}
                    onChange={handleSearchChange}
                    onSearch={value => listStore.handSearch(value)}
                    placeholder='请输入tree名称' />
            <div className={styles.treeWrap}>
              {
                treeData&&treeData.length > 0 &&
                <Tree
                  defaultExpandedKeys={leftDepartExpandKeys && toJS(leftDepartExpandKeys)}
                  autoExpandParent
                  checkStrictly
                  treeData={treeDataFormate(toJS(treeData), returnIcon)}
                />
              }
              
            </div>
          </div>
          }
          <div className={styles.rightSmallBar}>
            <CommonTable
              rowKey='id'
              isBorder={true}
              columns={columns}
              loading={requestLoading}
              dataSource={toJS(listData)}
              total={pagination.total}
              pageSize={pagination.size}
              current={pagination.index}
              onChange={(pagination, filters, sorter, extra) => {
                const {current, pageSize } = pagination
               // 设置当前页
                listStore.setValue('pagination.index', current);
                listStore.setValue('pagination.size', pageSize);
                  // 重新获取数据
                  // pushURL()
                listStore.getListData();
              }}
            />
          </div>
        </div>
      </TableWrap>
  
      <Modal
        title={typeTitle}
        visible={showModel}
        onCancel={()=>listStore.cacheModal()}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          form={form}
          onFinish={onFinish}
        >
          {showFormItem()}
          <Form.Item label=" " className={styles.lastItem}>
            <Space>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button onClick={()=>listStore.cacheModal()}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default inject('listStore', 'userStore')(observer(BSUserList));