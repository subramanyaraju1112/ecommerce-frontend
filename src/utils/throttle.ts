export default function throttle<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) {
    let lastCall = 0
    let timeout: ReturnType<typeof setTimeout> | null = null
  
    return (...args: Parameters<T>) => {
      const now = Date.now()
  
      if (now - lastCall >= delay) {
        lastCall = now
        fn(...args)
      } else {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          lastCall = Date.now()
          fn(...args)
        }, delay - (now - lastCall))
      }
    }
  }
  