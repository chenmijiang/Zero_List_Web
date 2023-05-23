// 用途：刷新 token

import { NextApiRequest, NextApiResponse } from 'next'
import { generateToken, verifyToken } from '@/utils/auth'
import { check_email } from '@/utils/flyboom/user'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // 请求头通过cookie传递token
  const token = req.cookies.ZERO_LIST_USER

  if (!token) {
    return res.status(400).json({ message: 'Invalid token' })
  }

  // 验证 token
  try {
    const decode = verifyToken(token)
    if (!decode) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    // 验证邮箱是否存在
    try {
      // @ts-ignore
      const { data } = await check_email(decode.email)
      if (data.user === null) {
        // 不存在则返回错误信息
        return res.status(200).json({ message: '用户不存在' })
      }
    } catch (err) {
      return res.status(500).json({ message: '服务器错误' })
    }
    // 成功：返还 token
    // @ts-ignore
    const newToken = generateToken({ name: decode.name, email: decode.email })
    res.setHeader(
      'Set-Cookie',
      `ZERO_LIST_USER=${newToken}; path=/; httpOnly; max-age=${60 * 60 * 6}`
    )
    return res.status(200).json({
      message: '刷新 token 成功',
      token: newToken
    })
  } catch (err) {
    return res.status(401).json({ message: '刷新 token 失败' })
  }
}

export default handler
