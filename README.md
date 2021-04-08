# 目录结构
```
├── .eslintrc.js //eslint 配置
├── .gitignore // git忽略文件
├── .prettierrc.js // 保存格式化配置
├── README.md
├── analyzer // 文件包大小输入目录
│   └── index.html
├── craco.config.js // 不弹出eject craco配置合并webpack配置
├── jsconfig.json // 编辑器配置
├── package-lock.json // 锁定文件
├── package.json 
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js 
│   ├── common // 全局配置文件
│   │   ├── apis // 接口地址
│   │   │   └── index.ts
│   │   ├── hooks // 自定义hooks
│   │   │   └── index.ts
│   │   ├── network // 拦截器配置
│   │   │   └── axios-interceptor.ts
│   │   └── util // 公用方法
│   │       └── index.ts 
│   ├── components 
│   │   ├── BCZSComponents // 通用组件
│   │   ├── Business //业务组件
│   │   ├── UI // UI组件
│   ├── images
│   ├── index.tsx
│   ├── pages // 业务模块
│   ├── router
│   │   └── index.tsx
│   ├── store // Mobx 模块
│   └── theme // antd 主题色
│       └── antd.customize.less

```

## 本地环境
> npm run start 或 yarn start
  
## 开发环境
> npm run build:dev 或 yarn build:dev
  
## 测试环境
> npm run build:test 或 yarn build:test

## 预发环境
> npm run build:pre 或 yarn build:pre

## 生产环境
> npm run build:pro 或 yarn build:pro

## 环境变量
process.env.REACT_APP_ENV | 说明
---|---
development | 开发
test | 测试
preissue | 预发
production | 生产
doc | 本地分析

## 注意事项 ！！！
- 如果你用nvm管理node，可能会出现编辑器无法提交问题，
  解决方案：打开项目里的.git>hook>pre-commit编辑添加：
  `. $HOME/.nvm/nvm.sh`
- 引入组件或方法可直接基于src下直接引入:如 import XXX from 'common/util'  
- 开启eslint: 保持代码统一规范，加入了pre-commit;
- doc环境默认把分析目录输出到根目录下analyzer，可做分析
- 原则上不要直接在组件上书写style;  
- 创建less规范：**.module.less 开启css module;
- 关于主题颜色 圆角等 统一继承'~theme/antd.customize.less';
- 书写组件：保持大写开头，如：Modal;
- store: 保持逻辑层 尽量统一到Mobx处理;
- 关于新增+修改+查询业务按钮时添加loadding防止频繁请求；  
- page: 页面展示层;


## 默认添加包
> 1. pathval(可操作对象赋值)
```javascript
  setPathValue(this, path, value);
  setPathValue('obj.A', 'B')
```

> 2. query-string(格式化对象)
```javascript
  const queryString = require('query-string');

console.log(location.search);
//=> '?foo=bar'

const parsed = queryString.parse(location.search);
console.log(parsed);
//=> {foo: 'bar'}

console.log(location.hash);
//=> '#token=bada55cafe'

const parsedHash = queryString.parse(location.hash);
console.log(parsedHash);
//=> {token: 'bada55cafe'}

parsed.foo = 'unicorn';
parsed.ilike = 'pizza';

const stringified = queryString.stringify(parsed);
//=> 'foo=unicorn&ilike=pizza'

location.search = stringified;
// note that `location.search` automatically prepends a question mark
console.log(location.search);
//=> '?foo=unicorn&ilike=pizza'
```

> 3. react-loadable(懒加载)
```javascript

import Loadable from 'react-loadable'
// 懒加载
const Load = (component) => Loadable({
	loader: () => import(`pages/${component}`),
	loading () {
		return <div>
			    <LoadingOutlined />
		      </div>
	}
})
```
> 4. uuid(唯一Key)
```javascript
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

> 5. crypto-js(加密)
```javascript

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
 
const message, nonce, path, privateKey; // ...
const hashDigest = sha256(nonce + message);
const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
```