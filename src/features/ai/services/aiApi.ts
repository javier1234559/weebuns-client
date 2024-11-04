import { TranslateDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

interface RecommendTopicParams {
  category?: string
  count?: number
}

const aiApi = {
  recommendTopic(form: RecommendTopicParams = { count: 5 }) {
    return api
      .aiControllerRecommendTopics(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },
  translateAi(form: TranslateDto) {
    return api
      .aiControllerTranslate(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default aiApi
