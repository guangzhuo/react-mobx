import { createFromIconfontCN } from '@ant-design/icons';
import { createBrowserHistory, createMemoryHistory } from 'history';

// 阿里矢量图地址配置
export function IconfontCN() {
    return createFromIconfontCN({
        scriptUrl: 'xxxx.js',
    })
}

// history 用于判断走web还是node 
export const history = (typeof window !== 'undefined'
  ? createBrowserHistory()
  : createMemoryHistory());

// 针对treeData 返回数据格式
export const treeDataFormate = (data, fn, saveCall) => {
    const callBack = typeof fn === "function" ? fn:saveCall
    return data&&data.map(item => {
        item.key = item.id;
        item.title = callBack ? callBack(item) : `${item.name}`;
        item.value = item.id;
        // item.disableCheckbox = false;
        if (item.children&&item.children.length) item.children = treeDataFormate(item.children, callBack&&callBack(item), callBack);
        return item;
    })
}