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
│   │   │   └── index.js
│   │   ├── hooks // 自定义hooks
│   │   │   └── index.js
│   │   ├── network // 拦截器配置
│   │   │   └── axios-interceptor.js
│   │   └── util // 公用方法
│   │       └── index.js    
│   ├── components 
│   │   ├── BCZSComponents // 通用组件
│   │   ├── Business //业务组件
│   │   ├── UI // UI组件
│   ├── images
│   ├── index.js
│   ├── pages // 业务模块
│   ├── router
│   │   └── index.js
│   ├── store // Mobx 模块
│   └── theme // antd 主题色
│       └── antd.customize.less

```

##本地环境
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

## 注意事项 ！！！
- 开启eslint: 保持代码统一规范，加入了pre-commit;
- 开发环境默认把分析目录输出到根目录下analyzer，可做分析
- 创建less规范：**.module.less 开启css module;
- 书写组件：保持大写开头，如：Modal;
- store: 保持逻辑层 尽量统一到Mobx处理;
- page: 页面展示层;


## 默认添加包
> 1. pathval 
```javascript
  setPathValue(this, path, value);
  setPathValue('obj.A', 'B')
```

> 2. query-string
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

> 3. react-loadable
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
> 4. uuid
```javascript
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

> 5. crypto-js
```javascript

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
 
const message, nonce, path, privateKey; // ...
const hashDigest = sha256(nonce + message);
const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
```