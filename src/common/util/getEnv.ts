// 判断当前是否开发环境
export const isDev = process.env.REACT_APP_ENV === 'development'

// 判断当前是否测试环境
export const isTest = process.env.REACT_APP_ENV === 'test'

// 判断当前是否预发环境
export const isPre = process.env.REACT_APP_ENV === 'preissue'

// 判断当前是否线上环境
export const isProd = process.env.REACT_APP_ENV === 'production'

// 获取当前环境
export const getEnv = process.env.REACT_APP_ENV
