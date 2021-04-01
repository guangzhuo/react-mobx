import {observable, action} from 'mobx';
import { setPathValue } from 'pathval';

class ListStore {

	// constructor() {
	//   makeAutoObservable(this)
	// }

	// 请求数据的loading
	@observable requestLoading = false;
	// 筛选参数
	@observable queryData = {};
	// 列表数据
	@observable listData = [];
	// 分页
	@observable pagination = {
		index: 1,
		size: 10,
		total: 0
	};
	// 搜索框value
	@observable searchInputValue = '';

	// tree和账户管理
	// eslint-disable-next-line max-len
	@observable account: { showModel: boolean; modelData: {}; form: {}; level: number; modelType: string; typeTitle: string; searchForm: {}; keyword: string; orgId: number; parentId: string; treeData: any[] } = {
		level: 0,
		showModel: false, // 新增，编辑，删除 弹窗
		modelData: {}, // 显示时对应的数据
		modelType: 'add', // 打开不同类型弹窗内容
		typeTitle: '', // 不同标题
		form: {}, // 弹窗里面的实例化对象
		searchForm: {}, // search实例化对象form
		treeData: [], // 初始化tree树数据
		keyword: '', // 搜索时的val
		orgId: 0, // 点击树获得的id
		parentId: '', // 编辑初始化信息查询父级tree数
		// roleList: [], // 绑定角色数据
		// areaList: [], // 管辖区域数据
	}

	// 编辑或新增
	@observable AddEditObser = {
		visiable: false, // 弹窗显示
		id: '', // 编辑id
		title: '', // 标题
		modalFrom: null
	}

	// common-初始化设置from
	@action.bound setFrom (data: null) {
		this.AddEditObser.modalFrom = data
	}

	// common-显示 编辑-新增-激活 弹窗
	@action.bound typeShowModel (record: { level?: any; }, type: string) {
		this.account.showModel = true // 新增，编辑，删除 弹窗
		this.account.modelData = record // 显示时对应的数据
		this.account.modelType = type
		this.account.level = record.level;
		// add || edit tree
		// activatingEdit ｜｜ activating table 编辑和激活
		if (type === 'edit') {
			// this.editInfo() // tree详情
		}
		if (type === 'activating') {
			// this.detailAccount()
		}
		if (type === 'activatingEdit') {
			// this.detailAccount()
		}
		switch (type) {
			case 'add':
				this.account.typeTitle = '新增tree';
				break;
			case 'edit':
				this.account.typeTitle = '编辑tree';
				break;
			case 'delete':
				this.account.typeTitle = '删除tree';
				break;
			case 'activatingEdit':
				this.account.typeTitle = '编辑账号';
				break;
			case 'activating':
				this.account.typeTitle = '激活账号';
				break;
			default:
				break;
		}
		return false
	}

	// common-设值
	@action.bound setValue (key: string, value: any) {
		setPathValue(this, key, value)
	}

	// common-关闭弹窗
	@action.bound cacheModal () {
		this.account.showModel = false; // 关闭，编辑，删除 弹窗
		// this.mechanismId = undefined;
		this.clearModal();
	}

	// tree树-编辑tree详情
	// @action.bound editInfo() {
	//   console.log('editInfo')
	//   const {id} = this.account.modelData
	//   APIS.depDetail(id)
	//     .then(action('detail Data', detailData => {
	//       // parentId
	//       const {description, name, parentId} = detailData.data.data
	//       const {setFieldsValue} = this.AddEditObser.modalFrom
	//       setFieldsValue({
	//         description,
	//         orgName:parentId > 0 ? parentId: undefined,
	//         name,
	//         // parentId
	//       })
	//     }))
	//     .catch(action(error => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// tree树-编辑tree
	// @action.bound edit(valus) {
	//   console.log(valus)
	//   const { id, parentId } = this.account.modelData
	//   const params = {
	//     ...valus,
	//     parentId
	//   }
	//   APIS.editDept(id, params)
	//     .then(action('edit info', initData => {
	//       message.success('编辑成功')
	//       this.cacheModal()
	//       this.getAccountTree()
	//     }))
	//     .catch(action(error => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// tree树-搜索 tree
	// @action.bound getAccountTree() {
	//   const params = {
	//     name: this.keyword,
	//   }
	//   APIS.tree(params)
	//     .then(action('getThreeApi', ThreeData => {
	//       const { content } = ThreeData.data.data
	//       this.account.treeData = content
	//     }))
	//     .catch(action(error => {
	//       if(error.response) message.error(error.response.data.message)
	//     }))
	// }

	// tree树-搜索 value
	@action.bound handSearch (keyword: any) {
		this.account.keyword = keyword
		// this.getAccountTree()
	}

	// tree树-新增
	// @action.bound addDept(valus) {
	//   const { id } = this.account.modelData
	//   const params = {
	//     ...valus,
	//     parentId: id
	//   }
	//   APIS.addDept(params)
	//     .then(action('addDept', () => {
	//       message.success('新增tree成功');
	//       this.getAccountTree()
	//       this.cacheModal()
	//     }))
	//     .catch(action(error => {
	//       if (error.response) message.error(error.response.data.message);
	//       this.addDeptloading = false
	//     }))
	// }

	// tree树-删除
	// @action.bound deleteOk(item) {
	//   APIS.deleteDep(item.id)
	//     .then(action('getThreeApi', ThreeData => {
	//       message.success('删除tree成功');
	//       this.getAccountTree()
	//       this.cacheModal()
	//     }))
	//     .catch(action(error => {
	//       if(error.response) message.error(error.response.data.message)
	//     }))
	// }

	// tree树-搜索列表
	@action.bound treeClick (item: { id: number; }) {
		this.account.orgId = item.id
		this.pagination.index = 1
		// this.getListData()
	}

	// tree树-清空数据
	@action.bound clearModal () {
		// @ts-ignore
		const { resetFields, setFieldsValue } = this.AddEditObser.modalFrom
		resetFields()
		setFieldsValue({
			name: undefined, // tree名称
			orgName: undefined, // 所属tree名称
			description: '', // tree描述
			orgId: 0,  // 所属treeID
			roleId: undefined, // 绑定角色
			userStatus: 'DISABLED', // 状态
			areas: [] // 管理辖区
		})
	}

	// 账号-列表数据
	// @action.bound getListData() {
	//   this.requestLoading = true;
	//   const params = {
	//     index: this.pagination.index,
	//     size: this.pagination.size,
	//     orgId: this.account.orgId,
	//     // scfProvince: this.account.isArea,
	//     ...(this.queryData)
	//   }
	//   APIS.page(params)
	//     .then(action(({ data }) => {
	//       this.requestLoading = false;
	//       this.listData = data.data.content;
	//       this.pagination.total = getPathValue(data, 'data.page.total');
	//     }))
	//     .catch(action((error) => {
	//       if(error.response) message.error(error.response.data.message);
	//       this.requestLoading = false;
	//     }))
	// }

	// 账号-编辑详情
	// @action.bound detailAccount() {
	//   const {id} = this.account.modelData
	//   APIS.detailAccount(id)
	//     .then(action(({ data }) => {
	//       console.log(data)
	//       const {orgId, roleId, userStatus, areas} = data.data
	//       // this.listData = data.data.content;
	//       const { setFieldsValue } = this.AddEditObser.modalFrom
	//       setFieldsValue({
	//         orgId,  // 所属treeID
	//         roleId, // 绑定角色
	//         userStatus, // 状态
	//         areas // 管理辖区
	//       })
	//     }))
	//     .catch(action((error) => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// 账号-编辑
	// @action.bound editAccount(values) {
	//   console.log(values)
	//   const {id} = this.account.modelData
	//   const params = {
	//     ...values
	//   }
	//   APIS.editAccount(id, params)
	//     .then(action(({ data }) => {
	//       message.success('编辑成功')
	//       this.cacheModal()
	//       this.getListData()
	//     }))
	//     .catch(action((error) => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// 账号-激活
	// @action.bound activeAccount(values) {
	//   console.log(values)
	//   const {id} = this.account.modelData
	//   const params = {
	//     ...values
	//   }
	//   APIS.activeAccount(id, params)
	//     .then(action(({ data }) => {
	//       message.success('激活成功')
	//       this.cacheModal()
	//       this.getListData()
	//     }))
	//     .catch(action((error) => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// 账号-停用
	// @action.bound disabledAccunt(record) {
	//   console.log('disabledAccunt',record)
	//   APIS.disabledAccount(record.id)
	//     .then(action(({ data }) => {
	//       message.success('停用成功')
	//       this.getListData()
	//     }))
	//     .catch(action((error) => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// 账号-启用
	// @action.bound enabledAccount(record) {
	//   console.log('enabledAccount',record)
	//   APIS.enabledAccount(record.id)
	//     .then(action(({ data }) => {
	//       console.log(data)
	//       message.success('启用成功')
	//       this.getListData()
	//     }))
	//     .catch(action((error) => {
	//       if(error.response) message.error(error.response.data.message);
	//     }))
	// }

	// 账号-搜索条件重置清除请求数据
	clearValue () {
		this.pagination.index = 1
		this.pagination.size = 10
		this.account.orgId = 0
		this.queryData = {}
	}
	// 账号-搜索条件重置
	@action.bound reset () {
		// @ts-ignore
		const {setFieldsValue} = this.account.searchForm
		setFieldsValue({
			account: undefined,
			userName: undefined,
			gender: undefined,
			userStatus: undefined,
			area: undefined,
			contact: undefined,
			roleId: undefined,
			lastModifiedTs: undefined
		})
		this.clearValue()
		// this.getListData()
	}

	// common-重置
	@action.bound resetStore () {
		// 请求数据的loading
		this.requestLoading = false;
		// 筛选参数
		this.queryData = {};
		// 列表数据
		this.listData = [];
		// 分页
		this.pagination = {
			index: 1,
			size: 10,
			total: 0
		}

		this.account = {
			level: 0,
			showModel: false, // 新增，编辑，删除 弹窗
			modelData: {}, // 显示时对应的数据
			modelType: 'add', // 打开不同类型弹窗内容
			typeTitle: '', // 不同标题
			form: {}, // 弹窗里面的实例化对象
			searchForm: {}, // search实例化对象form
			treeData: [], // 初始化tree树数据
			keyword: '', // 搜索时的val
			orgId: 0, // 点击树获得的id
			parentId: '', // 编辑初始化信息查询父级tree数
		}

		this.AddEditObser = {
			visiable: false, // 弹窗显示
			id: '', // 编辑id
			title: '', // 标题
			modalFrom: null
		}
	}
}


export default new ListStore();
