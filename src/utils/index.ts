// 防抖函数
export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

// 节流函数
export function throttle(fn: Function, delay: number) {
  let start = Date.now()
  return () => {
    const end = Date.now()
    if (end - start >= delay) {
      fn()
      start = end
    }
  }
}
