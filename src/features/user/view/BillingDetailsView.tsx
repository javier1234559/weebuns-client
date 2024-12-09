import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Clock, CreditCard, Wallet } from 'lucide-react'

import { SubscriptionType } from '~/features/subscription/hooks/useSubscriptionStatus'
import subscriptionApi from '~/features/subscription/services/subscriptionApi'

interface Subscription {
  id: string
  type: SubscriptionType
  endDate: string
  correctionBalance: number
  status: string
}

interface PaymentRow {
  id: string
  paymentDate: string
  amount: string
  paymentType: string
  status: string
  subscription: Subscription
}

interface PaymentResponse {
  data: PaymentRow[]
  pagination: {
    totalItems: number
    currentPage: number
    totalPages: number
    itemsPerPage: number
  }
}

const columns: GridColDef<PaymentRow>[] = [
  {
    field: 'paymentDate',
    headerName: 'Date',
    flex: 1,
    valueGetter: (params: any) => dayjs(params.value).format('DD/MM/YYYY')
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueGetter: (params: any) => {
      const amount = parseInt(params) / 1000
      return `${amount.toLocaleString()} credits`
    }
  },
  {
    field: 'paymentType',
    headerName: 'Payment Method',
    flex: 1,
    renderCell: (params: GridRenderCellParams<PaymentRow>) => (
      <Chip size='small' label={params.value} color='primary' sx={{ textTransform: 'uppercase' }} />
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params: GridRenderCellParams<PaymentRow>) => (
      <Chip
        size='small'
        label={params.value}
        color={params.value === 'SUCCESS' ? 'success' : 'warning'}
        variant='outlined'
        sx={{ textTransform: 'capitalize' }}
      />
    )
  }
]

function BillingDetails() {
  const { data: paymentHistory } = useQuery<PaymentResponse>({
    queryKey: ['payment-history'],
    queryFn: async (): Promise<PaymentResponse> => {
      const response = await subscriptionApi.getHistory()
      return {
        data: (response.data ?? []).map((payment: any) => ({
          ...payment,
          subscription: payment.subscription ?? { id: '', type: '', endDate: '', correctionBalance: 0, status: '' }
        })),
        pagination: response.pagination
      }
    }
  })

  const latestSubscription = paymentHistory?.data[0]?.subscription
  console.log(JSON.stringify(latestSubscription, null, 2))
  const currentPlan = latestSubscription?.type.toLowerCase()
  const validUntil = latestSubscription?.endDate
  const correctionBalance = latestSubscription?.correctionBalance ?? 0

  return (
    <Box>
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h5' gutterBottom fontWeight='bold'>
                Current Plan
              </Typography>
              <Box display='flex' alignItems='center' gap={2} mt={2}>
                <Chip
                  label={currentPlan || 'Free'}
                  color={currentPlan === 'premium' ? 'primary' : 'default'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            </Box>

            <Stack direction='row' spacing={4}>
              <Box>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Clock size={20} />
                  <Typography variant='subtitle2' color='text.secondary'>
                    Valid Until
                  </Typography>
                </Stack>
                <Typography variant='body1' mt={1}>
                  {validUntil ? dayjs(validUntil).format('DD MMM YYYY') : 'N/A'}
                </Typography>
              </Box>

              <Box>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <Wallet size={20} />
                  <Typography variant='subtitle2' color='text.secondary'>
                    Correction Balance
                  </Typography>
                </Stack>
                <Typography variant='body1' mt={1}>
                  {correctionBalance} credits
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h5' gutterBottom fontWeight='bold' sx={{ mb: 3 }}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <CreditCard size={24} />
              <span>Payment History</span>
            </Stack>
          </Typography>

          <DataGrid
            rows={paymentHistory?.data ?? []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } }
            }}
            pageSizeOptions={[5, 10, 25]}
            autoHeight
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderColor: 'divider'
              },
              '& .MuiDataGrid-columnHeaders': {
                bgcolor: 'action.hover'
              }
            }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default BillingDetails
