import { useGetCorrectionIfExistQuery, useGetCorrectionsByEssayQuery } from '~/services/graphql/graphql'
import { PaginationParams } from '~/types/extend-api'

export const useListCorrectedByEssay = (params: PaginationParams, essayId: string) => {
  return useGetCorrectionsByEssayQuery({
    variables: {
      input: {
        essayId: essayId || '',
        page: params.page,
        perPage: params.perPage,
        search: params.search
      }
    },
    skip: !essayId
  })
}

export const useGetExistingCorrectedByEssay = (essayId: string) => {
  return useGetCorrectionIfExistQuery({
    variables: {
      essayId: essayId || ''
    },
    skip: !essayId
  })
}
