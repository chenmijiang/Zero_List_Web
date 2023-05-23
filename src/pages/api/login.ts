// 通过邮箱到数据库查找用户密码，比对后返还 token 或者错误信息

import { NextApiRequest, NextApiResponse } from 'next'
import { check_email, get_user } from '@/utils/flyboom/user'
import { generateToken } from '@/utils/auth'
import { comparePassword } from '@/utils/password_encryption'

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
    if (data.user === null) {
      // 不存在则返回错误信息
      return res.status(200).json({ message: '用户不存在' })
    }
  } catch (err) {
    return res.status(500).json({ message: '服务器错误' })
  }

  // 通过 飞布 查询数据库里查询该邮箱对应的密码，比对
  try {
    // 通过 飞布 查询数据库里用户
    const { data } = await get_user(email)
    // 查询失败
    if (data.user === null) {
      return res.status(400).json({ message: '用户不存在' })
    }
    // 密码比对
    const isMatch = await comparePassword(password, data.user.password)
    if (!isMatch) {
      return res.status(200).json({ message: '密码错误' })
    }
    // 成功：返还 token，记录登录时间，记录登录 IP，记录登录设备，记录登录地点
    const token = generateToken({ name: data.user.name, email: data.user.email })
    // token 写入到 cookie 里，httpOnly 为 true，过期时间为 6小时
    res.setHeader('Set-Cookie', `ZERO_LIST_USER=${token}; path=/; httpOnly; max-age=${60 * 60 * 6}`)

    return res.status(200).json({
      message: '登录成功',
      token,
      user: { id: data.user.id, name: data.user.name, email: data.user.email }
    })
  } catch (err) {
    // 失败：返还错误信息
    return res.status(401).json({ message: '登录失败', user: null })
  }
}

export default handler
