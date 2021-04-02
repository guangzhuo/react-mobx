import { axios } from 'common/network/axios-interceptor'

/**
 * Time：2020/11/3
 * Features：通用模块
 * */
// 登录模块
export const login = () => axios.get('/api/login/demo')
// test
export const getAreas = () => axios.get('/api/areas/demo')
