import { observable, action } from 'mobx'
import {setPathValue} from "pathval";

class UseStore {
 
  @observable userInfo = {}
  
  
  @observable toHref = ''

  // constructor() {
  //   makeAutoObservable(this)
  // }
  
  
  @action.bound setValue(path, value) {
    setPathValue(this, path, value);
  }

  @action.bound
  hasAuth(permissionKey) {
    const permissions = this.userInfo.permissions || {};
    return !permissionKey || permissions[permissionKey] || permissionKey === 'HX_ADMIN';
  }

  // 权限
  @action.bound
  renderWithAuth(permissionKey, renderElement) {
    const user_Permissions = this.userInfo.permissions || {};
    console.log(this)
    // console.log(UseStore)
    if (!permissionKey || user_Permissions[permissionKey]) {
      return renderElement;
    }
    // return renderElement;
    return null;
  }

}

export default new UseStore()