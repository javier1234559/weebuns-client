import {
  useCreateCorrectionEssayMutation,
  useGetCorrectionIfExistQuery,
  useGetCorrectionsByEssayQuery,
  useUpdateCorrectionEssayMutation
} from '~/services/graphql/graphql'
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

export const useCreateCorrectByEssay = () => {
  return useCreateCorrectionEssayMutation({
    refetchQueries: ['GetCorrectionsByEssay', 'GetCorrectionIfExist']
  })
}

export const useUpdateCorrectionEssay = () => {
  return useUpdateCorrectionEssayMutation({
    refetchQueries: ['GetCorrectionsByEssay', 'GetCorrectionIfExist'],
    onCompleted: (data) => {
      // Handle success if needed
      console.log('Updated correction:', data)
    },
    onError: (error) => {
      // Handle error if needed
      console.error('Error updating correction:', error)
    }
  })
}
