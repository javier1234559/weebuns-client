import { useEffect, useState } from 'react'

import useElementOnScreen from '~/hooks/useElementOnScreen'

interface UseCounterProps {
  end: number
  duration?: number
  delay?: number
}

export const useCounter = ({ end, duration = 2000, delay = 0 }: UseCounterProps) => {
  const [count, setCount] = useState(0)
  const { elementRef, inView } = useElementOnScreen({ threshold: 0.3 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let animationFrameId: number

    if (inView && !hasAnimated) {
      timeoutId = setTimeout(() => {
        const startTime = Date.now()

        const updateCount = () => {
          const currentTime = Date.now()
          const elapsedTime = currentTime - startTime
          const progress = Math.min(elapsedTime / duration, 1)

          // Easing function
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          const currentCount = Math.floor(easedProgress * end)

          setCount(currentCount)

          if (progress < 1) {
            animationFrameId = requestAnimationFrame(updateCount)
          } else {
            setHasAnimated(true)
          }
        }

        animationFrameId = requestAnimationFrame(updateCount)
      }, delay)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [inView, end, duration, delay, hasAnimated])

  return { count, elementRef }
}
