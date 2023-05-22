import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// 生成 token
export function generateToken(user: any) {
  const secretKey: string = process.env.TOKEN_SECRET_KEY || '0123456789'
  const payload = {
    name: user.name,
    email: user.email
  }

  const options = {
    expiresIn: '6h'
  }

  const token = jwt.sign(payload, secretKey, options)
  return token
}

// 验证 token
export async function verifyToken(token: string) {
  const secretKey: string = process.env.TOKEN_SECRET_KEY || '0123456789'

  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// 密码加密
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10 // Number of salt rounds for hashing

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    throw new Error('Failed to hash password')
  }
}

// 密码比对
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
  } catch (error) {
    throw new Error('Failed to compare password')
  }
}
