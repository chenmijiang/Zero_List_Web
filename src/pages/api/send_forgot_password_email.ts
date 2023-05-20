// 用途：发送忘记密码邮件

import { NextApiRequest, NextApiResponse } from 'next'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // let req.body = {
  //   email: 'jack.chenyuana@gmail.com',
  // }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: 'Invalid email' })
  }

  // 通过 飞布 查询数据库里是否存在该邮箱

  // 不存在：返还错误信息

  // 发送邮箱链接，重置密码
  return res.status(200).json({ message: 'Email sent', error: '' })
}

export default handler
