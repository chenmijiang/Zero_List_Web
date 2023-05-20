// 用途：注册
// 查询数据库里是否存在该邮箱，存在则返回错误信息，不存在则创建用户，返回 token

import { NextApiRequest, NextApiResponse } from 'next'

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  // let body = {
  //   name: 'jack',
  //   password: 'Mfaj2PnhNDb$x#U',
  //   platform: 'web',
  //   email: 'jack.chenyuana@qq.com'
  // }

  const { name, password, email } = req.body

  if (!name || !password || !email) {
    return res.status(400).json({ message: 'Invalid name or password or username' })
  }

  // 通过 飞布 查询数据库里是否存在该邮箱

  // 存在则返回错误信息

  // 不存在则创建用户，返回 token

  return res.status(200).json({ Error: '', token: null, user: { id: 1, name: 'jack', email: '' } })
}

export default handler
