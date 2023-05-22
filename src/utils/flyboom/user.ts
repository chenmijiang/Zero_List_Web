// 请求 flyboom 的 user 接口

import request from '@/utils/request'

const FLYBOOM_BASEURL = process.env.FLYBOOM_BASEURL

// 验证数据库里是否存在该邮箱
export const check_email = (email: string) => {
  return request('get', FLYBOOM_BASEURL + '/User/CheckEmail', {
    email
  })
}

// 注册
export const register = (name: string, password: string, email: string) => {
  return request('post', FLYBOOM_BASEURL + '/User/Register', {
    name,
    password,
    email
  })
}

// 登录
export const login = (name: string, password: string) => {
  return request('post', FLYBOOM_BASEURL + '/User/Login', {
    name,
    password
  })
}
