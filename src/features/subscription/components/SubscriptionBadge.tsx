import { alpha, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { motion } from 'framer-motion'
import { Crown, Sparkles } from 'lucide-react'

import { SubscriptionType, useSubscriptionStatus } from '~/features/subscription/hooks/useSubscriptionStatus'

interface StyleConfig {
  background?: string
  glow: string
  text?: string
  border?: string
  icon?: JSX.Element
}

type SubscriptionStyles = Record<SubscriptionType, StyleConfig>

export const SubscriptionBadge = () => {
  const theme = useTheme()
  const { type, isLoading } = useSubscriptionStatus()

  if (isLoading) return null

  const premiumStyles: SubscriptionStyles = {
    PREMIUM: {
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      glow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
      text: theme.palette.primary.contrastText,
      icon: <Crown size={16} strokeWidth={2.5} />
    },
    BASIC: {
      background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      glow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
      text: theme.palette.primary.contrastText,
      icon: <Sparkles size={16} strokeWidth={2.5} />
    },
    FREE: {
      background: 'transparent',
      glow: 'none',
      text: theme.palette.text.primary,
      border: `1px solid ${theme.palette.grey[300]}`
    }
  }

  const currentStyle = premiumStyles[type]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.8,
          px: 2,
          py: 0.6,
          borderRadius: '20px',
          background: type !== 'FREE' ? currentStyle.background : 'rgba(0, 0, 0, 0.08)',
          color: currentStyle.text,
          fontSize: '0.875rem',
          fontWeight: 600,
          letterSpacing: '0.025em',
          boxShadow: currentStyle.glow,
          border: currentStyle.border,
          ml: 1,
          userSelect: 'none',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: type !== 'FREE' ? 'translateY(-1px)' : 'none',
            boxShadow:
              type !== 'FREE' ? `${currentStyle.glow}, 0 4px 12px ${alpha(theme.palette.common.black, 0.1)}` : 'none'
          }
        }}
      >
        {currentStyle.icon && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              filter: `drop-shadow(0 0 2px ${alpha(theme.palette.common.white, 0.5)})`
            }}
          >
            {currentStyle.icon}
          </Box>
        )}
        <span style={{ position: 'relative', textTransform: 'capitalize', zIndex: 1 }}>{type.toLowerCase()}</span>
      </Box>
    </motion.div>
  )
}

SubscriptionBadge.displayName = 'SubscriptionBadge'
