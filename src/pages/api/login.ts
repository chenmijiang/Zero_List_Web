// 通过邮箱到数据库查找用户密码，比对后返还 token 或者错误信息

import { NextApiRequest, NextApiResponse } from 'next'
import { check_email } from '@/utils/flyboom/user'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // let req.body = {
  //   client_id: '761e9a31-ed2c-4614-b329-8db12f3f1768',
  //   email: 'jack.chenyuana@gmail.com',
  //   password: '1651219927asd',
  //   platform: 'web',
  // }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  // 通过 飞布 查询数据库里是否存在该邮箱
  try {
    const { data } = await check_email(email)
    if (data.user !== null) {
      // 存在则返回错误信息
      return res.status(200).json({ message: '邮箱已存在' })
    }
  } catch (err) {
    return res.status(500).json({ message: '服务器错误' })
  }

  // TODO: 通过 飞布 查询数据库里查询该邮箱对应的密码，比对

  // TODO: 成功：返还 token，记录登录时间，记录登录 IP，记录登录设备，记录登录地点

  // TODO: 失败：返还错误信息
  // return res.status(401).json({ Error: '授权失败' })

  // 比对后返还 token 或者错误信息
  return res.status(200).json({ Error: '', token: null, user: { id: 1, name: 'jack', email: '' } })
}

export default handler
