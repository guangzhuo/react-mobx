import { observable, action } from 'mobx'
import {setPathValue} from 'pathval';

class UseStore {

  @observable userInfo = {}

  @action.bound setValue (path:string, value:string|number|boolean|undefined) {
    setPathValue(this, path, value);
  }

}

export default new UseStore()
