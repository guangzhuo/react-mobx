import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import Loadable from 'react-loadable'
// 懒加载
const Load = (component: string) => Loadable({
	loader: () => import(`pages/${component}`),
	loading () {
		return <div style={{textAlign: 'center', fontSize: '30px'}}>
			<LoadingOutlined />
		</div>
	}
})
export {
	Load
}
