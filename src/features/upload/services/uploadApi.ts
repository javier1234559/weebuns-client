import { DeleteUploadResponse, UploadResponse } from '~/features/upload/services/upload.type'
import api from '~/services/api/axiosInstance'
import { handleApiError } from '~/utils/handle-api-error'

const uploadApi = {
  /**
   * Accept docs and images
   */
  uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return api
      .uploadControllerUploadFile(
        { file },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((res) => res.data as UploadResponse)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  /**
   * Upload multiple files
   */
  uploadMany(files: File[]) {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })

    return api
      .uploadControllerUploadMany(
        { files },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then((res) => res.data as UploadResponse[])
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  },

  // uploadVideo(file: File) {
  //   const formData = new FormData()
  //   formData.append('file', file)

  //   return api
  //     .uploadControllerUploadVideo(
  //       { file },
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }
  //     )
  //     .then((res) => res.data)
  //     .catch((err) => {
  //       handleApiError(err)
  //       throw err.response.data
  //     })
  // },

  deleteFile(key: string) {
    return api
      .uploadControllerDeleteFile(key)
      .then((res) => res.data as DeleteUploadResponse)
      .catch((err) => {
        handleApiError(err)
        throw err.response.data
      })
  }
}

export default uploadApi
