// 请求 flyboom 的 user 接口

import request from '@/utils/request'

const FLYBOOM_BASEURL = process.env.FLYBOOM_BASEURL

// 验证数据库里是否存在该邮箱
export const check_email = (email: string) => {
  return request('get', FLYBOOM_BASEURL + '/User/CheckEmail', {
    email
  })
}
