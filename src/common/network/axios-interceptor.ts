import axios from 'axios'
// import { getPathValue } from 'pathval';
// import queryString from 'query-string';
// import uuidv4 from 'uuid/v4';
// import { message } from 'antd';
const ins = axios.create()
console.warn('axios.create 被执行了！这条信息出现一次，意味着 ins 实例存在一个。')

const u = window.navigator.userAgent.toLocaleLowerCase();
const ie11 = /(trident)\/([\d.]+)/;
const b = u.match(ie11);  // 判断ie11
ins.interceptors.request.use(
  (axiosConfig) => {
    localStorage.setItem('axiosindex', '1');
    axiosConfig.headers['scf-source'] = 'XXX';
    axiosConfig.headers['Cache-Control'] = 'no-cache';


    // IE11 接口缓存问题
    if (b && axiosConfig.method === 'get') {
      if (axiosConfig.params) {
        axiosConfig.params['randomDate'] = Math.random();
      } else {
        if (axiosConfig.url?.includes('?')) {
          axiosConfig.url = `${axiosConfig.url}&randomDate=${Math.random()}`
        } else {
          axiosConfig.url = `${axiosConfig.url}?randomDate=${Math.random()}`
        }
      }
    }
    return axiosConfig;
  },
  // 请求 URL: http://localhost:3020/api/finance/user/checkCompanyRegion?nsrsbh=91340600MA2MQMC922&productId=150?randomDate=0.4857513726232369
  (error) => {
    console.log('request error', error);
  }
)

ins.interceptors.response.use((response) => response, (error) => {
  console.log(error.response)
  const {status, headers} = error.response
  if (status && status === 401) {
    const {location} = headers
    // ${encodeURIComponent(window.location.href)}
    if (location) {window.location.href = `${location}`}
    return false
  }
  // Do something with request error
  if (axios.isCancel(error)) {
    return Promise.reject(error);
  }
  // const code = getPathValue(error, 'response.data.code');

  const numIndex: number = JSON.parse(localStorage.getItem('axiosindex') || '{}');
  localStorage.setItem('axiosindex', `${numIndex + 1}`);
  return Promise.reject(error);
})

export {
  ins as axios
}
