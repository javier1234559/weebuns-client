export const getErrorMessage = (error: any): string => {
  return error?.response?.data?.message || 'Something went wrong'
}

export const isNotFoundError = (error: any): boolean => {
  return error?.response?.status === 404
}
