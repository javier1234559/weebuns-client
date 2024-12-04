export type PaymentType = 'stripe' | 'momo' | 'zalopay'

export interface MomoCallbackDto {
  orderId: string
  requestId: string
  amount: number
  resultCode: number
  message: string
  payType: string
  signature: string
}

export interface ZaloCallbackDto {
  data: string
  mac: string
  type: number
}

export type PaymentCallbackDto = MomoCallbackDto | ZaloCallbackDto
