import axios from 'axios'
// import { getPathValue } from 'pathval';
// import queryString from 'query-string';
// import uuidv4 from 'uuid/v4';
// import { message } from 'antd';
const ins = axios.create()
console.warn(
  'axios.create 被执行了！这条信息出现一次，意味着 ins 实例存在一个。'
)

const u = window.navigator.userAgent.toLocaleLowerCase()
const ie11 = /(trident)\/([\d.]+)/
const b = u.match(ie11) // 判断ie11
const CancelToken = axios.CancelToken
let requestQueue: {
  url: string
  data: string
  params: string
  method: any
}[] = []

// 请求拦截调用
function handleRequest(config: any) {
  // console.log('33333', config)
  // 提取四个参数用于区分相同的请求
  const { url, method, data = {}, params = {} } = config
  const jData = JSON.stringify(data),
    jParams = JSON.stringify(params)

  const panding = requestQueue.filter(
    (item) =>
      item.url === url &&
      item.method === method &&
      item.data === jData &&
      item.params === jParams
  )
  // console.log('1111111111', panding)
  // console.log('2222222222', panding.length)
  if (panding.length) {
    // 这里是重点，实例化CancelToken时，对参数 c 进行立即调用，即可立即取消当前请求
    config.cancelToken = new CancelToken((c) =>
      c(`重复的请求被主动拦截: ${url} + ${jData} + ${jParams}`)
    )
  } else {
    // 如果请求不存在，将数据转为JSON字符串格式，后面比较好对比
    requestQueue.push({
      url,
      data: jData,
      params: jParams,
      method
    })
  }
}

// 响应拦截调用
/* function handleResponse(config: any) {
  const { url, data = JSON.stringify({}), params = JSON.stringify({}) } = config
  let reqQueue = requestQueue.filter(
    (item) => item.url !== url && item.data !== data && item.params !== params
  )
  requestQueue = reqQueue
}*/

ins.interceptors.request.use(
  (axiosConfig) => {
    // console.log(axiosConfig)
    // if (requestQueue.length > 0) {
    //   return Promise.reject()
    // }
    localStorage.setItem('axiosindex', '1')
    axiosConfig.headers['scf-source'] = 'XXX'
    axiosConfig.headers['Cache-Control'] = 'no-cache'
    handleRequest(axiosConfig)
    // IE11 接口缓存问题
    if (b && axiosConfig.method === 'get') {
      if (axiosConfig.params) {
        axiosConfig.params['randomDate'] = Math.random()
      } else {
        axiosConfig.url = `${axiosConfig.url}?randomDate=${Math.random()}`
        // if (axiosConfig.url?.includes('?')) {
        //   axiosConfig.url = `${axiosConfig.url}&randomDate=${Math.random()}`
        // } else {
        //   axiosConfig.url = `${axiosConfig.url}?randomDate=${Math.random()}`
        // }
      }
    }
    return axiosConfig
  },
  (error) => {
    console.log('request error', error)
  }
)

ins.interceptors.response.use(
  (response) => {
    console.warn()
    // console.log('nnnnnnnnnnnnn', response)
    // handleResponse(response.config)
    return response
  },
  (error) => {
    console.log('ins.interceptors.response.error', error.response)
    const { status, headers } = error.response
    if (status && status === 401) {
      const { location } = headers
      // ${encodeURIComponent(window.location.href)}
      if (location) {
        window.location.href = `${location}`
      }
      return false
    }
    // Do something with request error
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }
    // const code = getPathValue(error, 'response.data.code');

    const numIndex: number = JSON.parse(
      localStorage.getItem('axiosindex') || '{}'
    )
    localStorage.setItem('axiosindex', `${numIndex + 1}`)
    return Promise.reject(error)
  }
)

export { ins as axios }
