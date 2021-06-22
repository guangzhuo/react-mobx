import { axios } from 'common/http/axios-interceptor'

/**
 * Time：2020/11/3
 * Features：通用模块
 * */
// 登录模块
export const login = () => axios.get('/api/login/demo')

// test
export const getTest = <T>(params: T): Promise<Array<T>> =>
  axios.get('/sug', { params })
