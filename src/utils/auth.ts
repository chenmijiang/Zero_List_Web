import jwt from 'jsonwebtoken'
import cookie from 'react-cookies'

const secretKey: string = process.env.TOKEN_SECRET_KEY || '0123456789'

// 生成 token
export function generateToken(user: any) {
  const payload = {
    name: user.name,
    email: user.email
  }

  const options = {
    expiresIn: '6h'
  }

  return jwt.sign(payload, secretKey, options)
}

// 验证 token
export function verifyToken(token: string) {
  return jwt.verify(token, secretKey)
}

// 获取当前用户cookie
export const getLoginUserCookie = () => {
  return cookie.load('userinfo')
}

// 用户登录，保存cookie
export const saveLoginCookie = (
  cookieStr: string,
  userinfo: string = 'https://github.com/chenmijiang/'
) => {
  cookie.save('userinfo', userinfo, {
    path: '/',
    maxAge: 60 * 60 * 6,
    expires: new Date(Date.now() + 60 * 60 * 6)
  })
  document.cookie = parseCookie(cookieStr)
}

// 刷新登录
export const refreshUserCookie = saveLoginCookie

// 用户登出，删除cookie
export const logoutCookie = () => {
  cookie.save('ZERO_LIST_USER', '', {})
  cookie.remove('ZERO_LIST_USER')
  cookie.remove('userinfo')
}

// cookie 解析
export const parseCookie = (cookieStr: string) => {
  const cookies = cookieStr.split(/;(?=\S)/)
  let res: string[] = []
  cookies.forEach((item) => {
    if (item.match(/^(ZERO_LIST_USER)/)) {
      res.push(item)
    }
  })
  return res.join(';')
}
