import { CreateNoteDto, FindOneNoteResponseDto, NotesResponse, UpdateNoteDto } from '~/services/api/api-axios'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

export interface NoteQueryParams {
  page?: number
  perPage?: number
  search?: string
  tags?: string[]
  isBookmarked?: boolean
  spaceId?: string
}

const noteApi = {
  create(data: CreateNoteDto): Promise<FindOneNoteResponseDto> {
    return api
      .noteControllerCreate(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  createOrUpdate(data: CreateNoteDto): Promise<FindOneNoteResponseDto> {
    return api
      .noteControllerCreateOrUpdate(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  findAll(query: NoteQueryParams): Promise<NotesResponse> {
    return api
      .noteControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  findOne(id: string): Promise<FindOneNoteResponseDto> {
    return api
      .noteControllerFindOne(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  update(id: string, data: UpdateNoteDto): Promise<FindOneNoteResponseDto> {
    return api
      .noteControllerUpdate(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  delete(id: string): Promise<FindOneNoteResponseDto> {
    return api
      .noteControllerDelete(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default noteApi
