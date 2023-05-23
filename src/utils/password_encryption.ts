import bcrypt from 'bcrypt'

// 密码加密
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10 // Number of salt rounds for hashing

  try {
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    throw new Error('Failed to hash password')
  }
}

// 密码比对
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    throw new Error('Failed to compare password')
  }
}
