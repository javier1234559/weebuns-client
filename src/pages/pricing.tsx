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
import { SubscriptionType } from '~/features/subscription/hooks/useSubscriptionStatus'
import subscriptionApi from '~/features/subscription/services/subscriptionApi'
import { useIsAuthenticated } from '~/hooks/auth'
import { RouteNames } from '~/router/route-name'
import { CreatePaymentDto } from '~/services/api/api-axios'
import { formatCurrency } from '~/utils/format-currency'

const PLANS = [
  {
    title: 'Miễn phí',
    price: 0,
    duration: 'Vĩnh viễn',
    currency: 'VND',
    planType: 'FREE',
    features: [
      'Lưu trữ 100 từ vựng',
      'Tạo 10 ghi chú học tập',
      '1 gợi ý chủ đề viết mỗi ngày',
      'Truy cập khóa học cơ bản',
      'Hỗ trợ từ cộng đồng'
    ],
    limits: {
      vocabulary: 100,
      notes: 10,
      aiSuggestions: 1 // mỗi ngày
    },
    buttonText: 'Bắt đầu ngay',
    recommended: false
  },
  {
    title: 'Cơ bản',
    price: 99000,
    duration: '1 tháng',
    currency: 'VND',
    planType: 'BASIC',
    features: [
      'Lưu trữ 1000 từ vựng',
      'Tạo 100 ghi chú học tập',
      '100 gợi ý chủ đề viết mỗi ngày',
      'Truy cập tất cả khóa học',
      'Hỗ trợ ưu tiên từ cộng đồng',
      'Tải xuống tài liệu học tập'
    ],
    limits: {
      vocabulary: 500,
      notes: 25,
      aiSuggestions: 10 // mỗi ngày
    },
    buttonText: 'Chọn gói Cơ bản',
    recommended: false
  },
  {
    title: 'Cao cấp',
    price: 199000,
    duration: '3 tháng',
    originalPrice: 99000 * 3,
    currency: 'VND',
    planType: 'PREMIUM',
    features: [
      'Bao gồm tất cả tính năng của gói Cơ bản',
      'Không giới hạn từ vựng',
      'Không giới hạn ghi chú học tập',
      'Không giới hạn gợi ý chủ đề viết',
      'Hỗ trợ ưu tiên cao cấp',
      'Truy cập sớm tính năng mới',
      'Thống kê học tập cá nhân'
    ],
    limits: {
      vocabulary: 'không giới hạn',
      notes: 'không giới hạn',
      aiSuggestions: 100
    },
    buttonText: 'Chọn gói Cao cấp',
    recommended: true,
    savings: '33%'
  }
]

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
        navigate(RouteNames.Dashboard)
        return
      }

      const paymentData: CreatePaymentDto = {
        planType: plan.planType as SubscriptionType,
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
              top: 40,
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

        {/* Price section with duration */}
        <Box sx={{ flex: '0 0 auto', mb: 3 }}>
          <Typography variant='h3' component='span' fontWeight='bold'>
            {formatCurrency(plan.price)}
          </Typography>
          <Typography variant='subtitle1' component='span' color='text.secondary'>
            /{plan.currency}
          </Typography>
          {plan.duration && (
            <Typography variant='subtitle2' color='text.secondary' sx={{ mt: 0.5 }}>
              {plan.duration === 'Vĩnh viễn' ? plan.duration : `Thanh toán mỗi ${plan.duration}`}
            </Typography>
          )}
        </Box>

        {/* Original price and savings */}
        {plan.originalPrice && (
          <Box sx={{ flex: '0 0 auto', mb: 2 }}>
            <Typography variant='body2' color='text.secondary' sx={{ textDecoration: 'line-through' }}>
              Giá gốc: {formatCurrency(plan.originalPrice)} {plan.currency}
            </Typography>
            {plan.savings && (
              <Typography variant='body2' color='success.main' fontWeight='bold'>
                Tiết kiệm {plan.savings}
              </Typography>
            )}
          </Box>
        )}

        {/* Features section */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {/* Limits section */}
          {plan.limits && (
            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle2' color='text.secondary' sx={{ mb: 1 }}>
                Giới hạn sử dụng:
              </Typography>
              <Box sx={{ pl: 1 }}>
                <Typography variant='body2'>• Từ vựng: {plan.limits.vocabulary}</Typography>
                <Typography variant='body2'>• Ghi chú: {plan.limits.notes}</Typography>
                <Typography variant='body2'>
                  • Gợi ý AI: {plan.limits.aiSuggestions}
                  {typeof plan.limits.aiSuggestions === 'number' ? ' mỗi ngày' : ''}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Features list */}
          <Box>
            <Typography variant='subtitle2' color='text.secondary' sx={{ mb: 1 }}>
              Tính năng bao gồm:
            </Typography>
            {plan.features.map((feature, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1
                }}
              >
                <Check
                  size={16}
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

        {/* Subscribe button */}
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
