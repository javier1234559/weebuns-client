import { useEffect, useRef, useState } from 'react'

const useElementOnScreen = (options: IntersectionObserverInit = {}) => {
  const [inView, setInView] = useState(false)
  const elementRef = useRef(null)

  const callbackFunction: IntersectionObserverCallback = (entries) => {
    const [entry] = entries
    setInView(entry.isIntersecting)
  }

  useEffect(() => {
    const optionDefault = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const option = { ...optionDefault, ...options }
    const observer = new IntersectionObserver(callbackFunction, option)

    const currentElement = elementRef.current
    if (currentElement) observer.observe(currentElement)

    return () => {
      if (currentElement) observer.unobserve(currentElement)
    }
  }, [elementRef, options])

  return {
    elementRef,
    inView
  }
}

export default useElementOnScreen
