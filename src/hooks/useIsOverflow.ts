import { useEffect, useState } from 'react'

export const useIsOverflow = (ref: React.RefObject<HTMLElement>, callback?: (isOverflow: boolean) => void) => {
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    const element = ref.current

    const trigger = () => {
      if (element) {
        const hasOverflow = element.scrollHeight > element.clientHeight
        setIsOverflow(hasOverflow)
        if (callback) callback(hasOverflow)
      }
    }

    trigger()

    // Thêm resize observer để check khi kích thước thay đổi
    const resizeObserver = new ResizeObserver(trigger)
    if (element) resizeObserver.observe(element)

    return () => {
      if (element) resizeObserver.unobserve(element)
    }
  }, [callback, ref])

  return isOverflow
}
