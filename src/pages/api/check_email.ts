// 验证数据库里是否存在该邮箱

import { NextApiRequest, NextApiResponse } from 'next'

import { check_email } from '@/utils/flyboom/user'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: '非法邮箱，请输入正确邮箱' })
  }

  // 通过 飞布 查询数据库里是否存在该邮箱
  try {
    const { data } = await check_email(email)
    if (data.user !== null) {
      return res.status(200).json({ user_exists: true, use_captcha: true })
    }
  } catch (err) {
    return res.status(500).json({ message: '服务器错误' })
  }

  return res.status(200).json({ user_exists: false, use_captcha: false })
}

export default handler
