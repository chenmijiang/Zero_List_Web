// 重置密码

import { NextApiRequest, NextApiResponse } from 'next'
import { check_email, reset_password } from '@/utils/flyboom/user'
import { hashPassword } from '@/utils/password_encryption'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // post 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  // 通过 飞布 查询数据库里是否存在该邮箱
  try {
    const { data } = await check_email(email)
    if (data.user === null) {
      // 不存在则返回错误信息
      return res.status(200).json({ message: '用户不存在', code: 800 })
    }
  } catch (err) {
    return res.status(500).json({ message: '服务器错误' })
  }

  try {
    // 密码混淆
    const password = await hashPassword(req.body.password)
    // 通过 飞布 重设密码
    const { data } = await reset_password(email, password)
    if (data.user === null) {
      // 不存在则返回错误信息
      return res.status(200).json({ message: '密码重置失败', code: 802 })
    }
    return res.status(200).json({ message: '密码重置成功', code: 801, user: { email } })
  } catch (err) {
    return res.status(500).json({ message: '密码重置失败', code: 802 })
  }
}

export default handler
