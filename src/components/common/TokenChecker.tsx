import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

const TokenChecker = ({ children }: Props) => {
  const router = useRouter()
  const [check, setCheck] = useState(false)

  useEffect(() => {
    // 模拟检查用户 token 的逻辑，这里假设 token 存储在 localStorage 中
    const token = localStorage.getItem('token')

    // 这里可以根据实际需求添加其他 token 失效的判断逻辑

    if (!token && router.pathname !== '/login') {
      router.push('/login')
    } else {
      setCheck(true)
    }
  }, [router])

  if (check) return <>{children}</>

  return null
}

export default TokenChecker
