import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLoginUserCookie, logoutCookie } from '@/utils/auth'
import request from '@/utils/request'
import toast from 'react-hot-toast'

type Props = {
  children: React.ReactNode
}

const TokenChecker = ({ children }: Props) => {
  const router = useRouter()
  const [check, setCheck] = useState(false)

  useEffect(() => {
    // 检查是否有 token
    const token = getLoginUserCookie()

    setCheck(true)
    if (!token) {
      if (router.pathname !== '/login') {
        router.replace('/login')
      } else {
        setCheck(true)
      }
    } else {
      setTimeout(() => {
        setCheck(true)
      }, 2000)
      // 检查 token 是否过期
      request('get', '/api/refresh_token')
        .then((data: any) => {
          // token 过期
          if (!data.token) {
            // 清除 本地 token，cookie，跳转到登录页
            logoutCookie()
            toast.error('登录信息已过期，请重新登录')
            if (router.pathname !== '/login') {
              router.push('/login')
            }
            return
          }
          if (router.pathname === '/login') {
            router.push('/myday')
          }
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }, [router])

  if (check) return <>{children}</>

  return null
}

export default TokenChecker
