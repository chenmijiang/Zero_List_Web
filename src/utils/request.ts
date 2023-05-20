import axios, { Method } from 'axios'

const instance = axios.create({
  withCredentials: true,
  timeout: 30000
})

// 取消请求令牌的容器
const pendingRequests = new Map<string, AbortController>()

// 生成取消令牌的标识
const generateCancelTokenKey = (config: any) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

instance.interceptors.request.use((config) => {
  // 取消请求令牌
  const controller = new AbortController()
  pendingRequests.set(generateCancelTokenKey(config), controller)
  config.signal = controller.signal
  return config
})

instance.interceptors.response.use(
  (response) => {
    // 清除请求令牌
    const key = generateCancelTokenKey(response.config)
    pendingRequests.delete(key)
    return response.data
  },
  (error) => Promise.reject(error)
)

const request = (method: Method, url: string, params?: any, data?: any, headers?: any) => {
  return instance({
    method,
    url,
    data,
    params,
    headers
  })
}

// 取消所有挂起的请求
export const cancelAllPendingRequests = () => {
  // @ts-ignore
  for (const [key, controller] of pendingRequests.entries()) {
    controller.abort()
    pendingRequests.delete(key)
  }
}

export default request
