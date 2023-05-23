// 用途：注册
// 查询数据库里是否存在该邮箱，存在则返回错误信息，不存在则创建用户，返回 token
import { NextApiRequest, NextApiResponse } from 'next'
import { check_email, register } from '@/utils/flyboom/user'
import { hashPassword } from '@/utils/password_encryption'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, password, email } = req.body

  if (!name || !password || !email) {
    return res.status(400).json({ message: 'Invalid name or password or username' })
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

  // 不存在则创建用户
  try {
    // 密码加密
    const password = await hashPassword(req.body.password)
    // 通过 飞布 创建用户
    const { data } = await register(name, password, email)
    // 创建失败
    if (data.user === null) {
      return res.status(400).json({ message: '注册失败' })
    }
    // 创建成功
    return res.status(200).json({ message: '注册成功' })
  } catch (err) {
    return res.status(400).json({ message: '注册失败' })
  }
}

export default handler
