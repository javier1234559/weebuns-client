import {
  CreateVocabularyDto,
  FindOneVocabularyResponseDto,
  UpdateVocabularyDto,
  VocabularyResponse
} from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

export interface VocabularyQueryParams {
  page?: number
  perPage?: number
  search?: string
  dueDate?: boolean
  spaceId?: string
}

const vocabularyApi = {
  create(data: CreateVocabularyDto) {
    return api
      .vocabularyControllerCreate(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  findAll(query: VocabularyQueryParams): Promise<VocabularyResponse> {
    return api
      .vocabularyControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  findOne(id: string): Promise<FindOneVocabularyResponseDto> {
    return api
      .vocabularyControllerFindOne(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, data: UpdateVocabularyDto): Promise<FindOneVocabularyResponseDto> {
    return api
      .vocabularyControllerUpdate(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string): Promise<FindOneVocabularyResponseDto> {
    return api
      .vocabularyControllerDelete(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default vocabularyApi
