import { observable, action } from 'mobx'
import { TValue } from 'types/type'
import { setPathValue } from 'pathval'

class ListStore {
  // 筛选参数
  @observable queryData = {}
  @observable requestLoading = false

  // common-设值
  @action.bound setValue(key: string, value: TValue) {
    setPathValue(this, key, value)
  }

  // common-重置
  @action.bound resetStore() {
    // 请求数据的loading
    this.requestLoading = false
    // 筛选参数
    this.queryData = {}
  }
}

export default new ListStore()
