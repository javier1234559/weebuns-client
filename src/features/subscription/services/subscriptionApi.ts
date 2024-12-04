import { PaymentType } from '~/features/subscription/subscription.type'
import {
  CheckPaymentStatusDto,
  CheckPaymentStatusResponseDto,
  CreatePaymentDto,
  CreatePaymentResponseDto
} from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const subscriptionApi = {
  getStatus() {
    return api
      .subscriptionControllerGetStatus()
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  createPayment(provider: PaymentType, data: CreatePaymentDto): Promise<CreatePaymentResponseDto> {
    return api
      .subscriptionControllerCreatePayment(provider, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  checkPaymentStatus(provider: PaymentType, data: CheckPaymentStatusDto): Promise<CheckPaymentStatusResponseDto> {
    return api
      .subscriptionControllerCheckPaymentStatus(provider, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }

  // paymentCallback(provider: PaymentType, data: PaymentCallbackDto) {
  //   return api
  //     .subscriptionControllerPaymentCallback(provider, data as any)
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // }
}

export default subscriptionApi
