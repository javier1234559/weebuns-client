import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    revive?: {
      queue?: Array<() => void>
      live?: () => void
    }
  }
}

interface AdContextType {
  isAdLoaded: boolean
  refreshAds: () => void
  adError: string | null
}

const AdContext = createContext<AdContextType | null>(null)

// const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAdLoaded, setIsAdLoaded] = useState(false)
//   const [adError, setAdError] = useState<string | null>(null)
//   const location = useLocation() // Hook để track route changes

//   const initializeAds = () => {
//     // Check if script already exists
//     const existingScript = document.querySelector('script[src*="asyncjs.php"]')
//     if (existingScript) {
//       setIsAdLoaded(true)
//       return
//     }

//     try {
//       const script = document.createElement('script')
//       script.src = '//ads.intergreat.com/www/delivery/asyncjs.php'
//       script.async = true
//       script.onload = () => {
//         setIsAdLoaded(true)
//         // Initial load của ads
//         refreshAds()
//       }
//       script.onerror = () => setAdError('Failed to load ads')
//       document.body.appendChild(script)
//     } catch (error) {
//       setAdError('Error initializing ads')
//     }
//   }

//   const refreshAds = () => {
//     // Đảm bảo script đã load xong
//     if (window.revive) {
//       window.revive.queue = window.revive.queue || []
//       window.revive.queue.push(() => {
//         // Xóa ads cũ
//         const oldAds = document.querySelectorAll('ins[data-revive-zoneid]')
//         oldAds.forEach((ad) => {
//           ad.innerHTML = ''
//           ad.classList.remove('revive-loaded')
//         })

//         // Load ads mới
//         window.revive?.live?.()
//       })
//     }
//   }

//   // Initialize ads on first load
//   useEffect(() => {
//     initializeAds()
//   }, [])

//   // Refresh ads when route changes
//   useEffect(() => {
//     if (isAdLoaded) {
//       refreshAds()
//     }
//   }, [location.pathname, isAdLoaded]) // Re-run when route changes

//   return <AdContext.Provider value={{ isAdLoaded, refreshAds, adError }}>{children}</AdContext.Provider>
// }

// AdContext.tsx
const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdLoaded, setIsAdLoaded] = useState(false)
  const [adError, setAdError] = useState<string | null>(null)
  const location = useLocation()

  const initializeAds = () => {
    try {
      const script = document.createElement('script')
      script.src = '//ads.intergreat.com/www/delivery/asyncjs.php'
      script.async = true
      script.id = 'revive-ad-script'

      // Thêm global function để script có thể gọi
      window.revive = window.revive || {
        queue: [],
        live: () => {
          console.log('Ad refresh triggered')
        }
      }

      script.onload = () => {
        setIsAdLoaded(true)
        refreshAds()
      }

      document.body.appendChild(script)
    } catch (error) {
      setAdError('Error initializing ads')
    }
  }

  const refreshAds = () => {
    if (window.revive) {
      window.revive.queue = window.revive.queue || []
      window.revive.queue.push(() => {
        if (window.revive?.live) {
          window.revive.live()
        }
      })
    }
  }

  useEffect(() => {
    initializeAds()
  }, [])

  useEffect(() => {
    if (isAdLoaded) {
      refreshAds()
    }
  }, [location.pathname, isAdLoaded])

  return <AdContext.Provider value={{ isAdLoaded, refreshAds, adError }}>{children}</AdContext.Provider>
}

export const useAds = () => {
  const context = useContext(AdContext)
  if (!context) {
    throw new Error('useAds must be used within AdProvider')
  }
  return context
}

export default AdProvider
