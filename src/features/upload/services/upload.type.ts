export interface UploadResponse {
  data: {
    key: string
    url: string
    appUrl: string
    lastModified: number
    name: string
    size: number
    type: string
    customId: string | null
    fileHash: string
  }
  error: unknown
}

export interface DeleteUploadResponse {
  success: string
  message: string
}
