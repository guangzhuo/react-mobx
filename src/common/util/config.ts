// import { XMLHttpRequestResponseType } from 'typescript'
import { createFromIconfontCN } from '@ant-design/icons'
import moment from 'moment'
import { createBrowserHistory, createMemoryHistory } from 'history'

interface IUser {
  children?: any
  id?: string
  name?: string
  key?: string
  title?: string
  value?: string
  // children?: Array<T>[]
}

// 阿里矢量图地址配置
const IconfontCN = () =>
  createFromIconfontCN({
    scriptUrl: 'xxxx.js'
  })

// history 用于判断走web还是node
const history =
  typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory()

// 针对treeData 返回数据格式
const treeDataFormate = (data: any, fn: any, saveCall: any) => {
  const callBack = typeof fn === 'function' ? fn : saveCall
  return (
    data &&
    data.map((item: IUser) => {
      item.key = item.id
      item.title = callBack ? callBack(item) : `${item.name}`
      item.value = item.id
      // item.disableCheckbox = false;
      if (item.children && item.children.length) {
        item.children = treeDataFormate(
          item.children,
          callBack && callBack(item),
          callBack
        )
      }
      return item
    })
  )
}

/*
 * 根据后端返回的pdf文件的地址，下载pdf文件
 *  url 完整的路径
 *  fileName 文件名
 * type 文件类型，如.pdf
 */
const downFile = (url: string, fileName: string, type: string) => {
  let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$/
  if (!reg.test(url)) {
    throw new Error('传入参数不合法,不是标准的文件链接')
  } else {
    let xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.setRequestHeader('Content-Type', `application/${type}`)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status == 200) {
        // 接受二进制文件流
        let blob = this.response
        downloadExportFile(blob, fileName, type)
      }
    }
    xhr.send()
  }
}

const downloadExportFile = (
  blob: string | XMLHttpRequestResponseType,
  tagFileName: string,
  fileType: string
) => {
  let downloadElement = document.createElement('a')
  let href = blob
  if (typeof blob == 'string') {
    downloadElement.target = '_blank'
  } else {
    href = window.URL.createObjectURL(blob) // 创建下载的链接
  }
  downloadElement.href = href
  downloadElement.download =
    tagFileName +
    moment(new Date().getTime()).format('YYYYMMDDhhmmss') +
    '.' +
    fileType // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  if (typeof blob != 'string') {
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
}

const config = {
  development: {
    url: 'https://a.com/'
  },
  test: {
    url: 'https://b.com/'
  },
  preissue: {
    url: 'https://c.com/'
  },
  production: {
    url: 'https://d.com/'
  }
}
export { IconfontCN, history, treeDataFormate, config, downFile }
