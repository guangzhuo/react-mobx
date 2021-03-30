import { createFromIconfontCN } from '@ant-design/icons';
import { createBrowserHistory, createMemoryHistory } from 'history';

// 阿里矢量图地址配置
const IconfontCN = () => createFromIconfontCN({
    scriptUrl: 'xxxx.js',
  })

// history 用于判断走web还是node
const history = (typeof window !== 'undefined'
  ? createBrowserHistory()
  : createMemoryHistory());

// 针对treeData 返回数据格式
const treeDataFormate = (data, fn, saveCall) => {
  const callBack = typeof fn === 'function' ? fn : saveCall
  return data && data.map((item) => {
    item.key = item.id;
    item.title = callBack ? callBack(item) : `${item.name}`;
    item.value = item.id;
    // item.disableCheckbox = false;
    if (item.children && item.children.length) {item.children = treeDataFormate(item.children, callBack && callBack(item), callBack);}
    return item;
  })
}

export {
  IconfontCN,
  history,
  treeDataFormate
}


