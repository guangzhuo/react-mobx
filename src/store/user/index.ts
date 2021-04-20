import { observable, action } from 'mobx'
import { setPathValue } from 'pathval'
import { message } from 'antd'
import { TValue } from 'types/type'
import * as APIS from 'common/apis'

class UseStore {
  // 用户信息
  @observable userInfo = {
    id: 0,
    name: '12'
  }

  @observable
  quillEditor = null

  // 赋值
  @action.bound setValue(path: string, value: TValue) {
    setPathValue(this, path, value)
  }

  // demo-请求
  @action.bound login() {
    APIS.getTest()
      .then(
        action('login', (rs) => {
          console.log('Store Test 1111111', rs)
          message.success('编辑成功')
        })
      )
      .catch(
        action('login error', (error) => {
          if (error.response) {
            message.error(error.response.data.message)
          }
        })
      )
  }
}

export default new UseStore()
