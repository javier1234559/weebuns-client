import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import AppButton from '~/components/common/AppButton'
import subscriptionApi from '~/features/subscription/services/subscriptionApi'
import { useIsAuthenticated } from '~/hooks/auth'
import { RouteNames } from '~/router/route-name'
import { CreatePaymentDto } from '~/services/api/api-axios'
import { formatCurrency } from '~/utils/format-currency'

const PLANS = [
  {
    title: 'Free',
    price: 0,
    currency: 'VND',
    planType: 'FREE',
    features: [
      'Access to free courses',
      'Basic community support',
      'Limited resources',
      'Basic learning materials',
      'Community forum access'
    ],
    buttonText: 'Get Started',
    recommended: false
  },
  {
    title: 'Basic',
    price: 100000,
    currency: 'VND',
    planType: 'BASIC',
    features: [
      'Access to all courses',
      'Priority support',
      'Downloadable resources',
      'Course completion certificates',
      'Ad-free experience'
    ],
    buttonText: 'Choose Basic',
    recommended: false
  },
  {
    title: 'Premium',
    price: 70000, // 30% off 100,000
    originalPrice: 100000,
    currency: 'VND',
    planType: 'PREMIUM',
    features: [
      'All Basic features',
      'Early access to new courses',
      'Exclusive workshops',
      'Personal learning path',
      'Premium community access'
    ],
    buttonText: 'Choose Premium',
    recommended: true
  }
]

type PLANS_TYPE = 'FREE' | 'BASIC' | 'PREMIUM'

const PricingCard = ({ plan, index }: { plan: (typeof PLANS)[0]; index: number }) => {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const theme = useTheme()

  const DEFAULT_PAYMENT_METHOD = 'momo'

  const handleSubscribe = async () => {
    try {
      if (!isAuthenticated) {
        navigate(RouteNames.Login)
        return
      }

      if (plan.planType === 'FREE') {
        return
      }

      const paymentData: CreatePaymentDto = {
        planType: plan.planType as PLANS_TYPE,
        amount: plan.price,
        currency: plan.currency
      }

      const response = await subscriptionApi.createPayment(DEFAULT_PAYMENT_METHOD, paymentData)

      if (response.paymentUrl) {
        window.location.href = response.paymentUrl
      }
    } catch (error) {
      toast.error('Payment creation failed: ' + error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      style={{ height: '100%', width: '100%' }}
    >
      <Paper
        elevation={plan.recommended ? 12 : 3}
        sx={{
          p: 2,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          borderRadius: 2,
          border: plan.recommended ? `2px solid ${theme.palette.primary.main}` : 'none',
          '&:hover': {
            transform: 'translateY(-8px)'
          }
        }}
      >
        {plan.recommended && (
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: -30,
              transform: 'rotate(45deg)',
              backgroundColor: 'primary.main',
              color: 'white',
              px: 4,
              py: 0.5,
              width: 200,
              textAlign: 'center'
            }}
          >
            Recommended
          </Box>
        )}

        <Typography variant='h5' fontWeight='bold' mb={2}>
          {plan.title}
        </Typography>

        <Box sx={{ flex: '0 0 auto', mb: 3 }}>
          <Typography variant='h3' component='span' fontWeight='bold'>
            {formatCurrency(plan.price)}
          </Typography>
          <Typography variant='subtitle1' component='span' color='text.secondary'>
            /{plan.currency}
          </Typography>
        </Box>

        {plan.originalPrice && (
          <Box sx={{ flex: '0 0 auto', mb: 2 }}>
            <Typography variant='body2' color='text.secondary' sx={{ textDecoration: 'line-through' }}>
              Original: {formatCurrency(plan.originalPrice)} {plan.currency}
            </Typography>
            <Typography variant='body2' color='success.main' fontWeight='bold'>
              Save 30%
            </Typography>
          </Box>
        )}

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            {plan.features.map((feature, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2
                }}
              >
                <Check
                  size={20}
                  style={{
                    color: theme.palette.primary.main,
                    flexShrink: 0
                  }}
                />
                <Typography variant='body2'>{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          <AppButton
            fullWidth
            variant={plan.recommended ? 'contained' : 'outlined'}
            color='primary'
            size='large'
            onClick={handleSubscribe}
            sx={{
              transition: 'all 0.3s ease-in-out',
              transform: 'scale(1)',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: theme.shadows[4]
              }
            }}
          >
            {plan.buttonText}
          </AppButton>
        </Box>
      </Paper>
    </motion.div>
  )
}

const Pricing = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        py: 4,
        px: { xs: 2, sm: 3 }
      }}
    >
      <Box textAlign='center' mb={4}>
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          variant='h2'
          fontWeight='bold'
          mb={2}
        >
          Choose Your Plan
        </Typography>
        <Typography
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variant='h6'
          color='text.secondary'
        >
          Select the perfect plan for your learning journey
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        alignItems='stretch'
        sx={{
          mx: 'auto',
          width: '100%',
          maxWidth: 'lg'
        }}
      >
        {PLANS.map((plan, index) => (
          <Grid
            item
            xs={12}
            md={4}
            key={plan.title}
            sx={{
              display: 'flex',
              p: 1
            }}
          >
            <PricingCard plan={plan} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Pricing
