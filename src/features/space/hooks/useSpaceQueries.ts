import { useApolloClient } from '@apollo/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { SPACE_KEY_FACTORY } from '~/features/space/services/space-key-factory'
import spaceApi from '~/features/space/services/spaceApi'
import { CreateSpaceDto, UpdateSpaceDto } from '~/services/api/api-axios'
import {
  GetSpacesByUserDocument,
  GetSpacesByUserSelectDocument,
  useGetSpacesByUserQuery,
  useGetSpacesByUserSelectQuery
} from '~/services/graphql/graphql'
import { PaginationParams } from '~/types/extend-api'

// export const useSpaces = (params: PaginationParams): UseQueryResult<SpacesResponse> => {
//   return useQuery({
//     queryKey: SPACE_KEY_FACTORY.list(params),
//     queryFn: () => spaceApi.getAll(params),
//     staleTime: 1000 * 60 * 5 // 5 minutes
//   })
// }

export const useSpacesByUser = (params: PaginationParams, userId?: string | null) => {
  return useGetSpacesByUserQuery({
    variables: {
      input: {
        userId: userId || '',
        page: params.page,
        perPage: params.perPage,
        search: params.search
      }
    },
    skip: !userId
    // fetchPolicy: 'cache-and-network'
  })
}

export const useSpacesById = (spaceId: string, options?: unknown) => {
  return useQuery({
    queryKey: SPACE_KEY_FACTORY.detail(spaceId),
    queryFn: () => spaceApi.getById(spaceId),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === 'object' ? options : {})
  })
}

export const useSpacesByUserSelect = (userId?: string | null) => {
  return useGetSpacesByUserSelectQuery({
    variables: {
      input: {
        userId: userId || ''
      }
    },
    skip: !userId
    // fetchPolicy: 'cache-and-network'
  })
}

export const useCreateSpace = () => {
  const queryClient = useQueryClient()
  const apolloClient = useApolloClient() //Get Apollo client if you need to refetch GraphQL

  return useMutation({
    mutationFn: (data: CreateSpaceDto) => spaceApi.create(data),
    onSuccess: () => {
      // Invalidate React Query cache
      queryClient.invalidateQueries({ queryKey: SPACE_KEY_FACTORY.lists() })

      // Optional: Refetch GraphQL query by document type
      apolloClient.refetchQueries({
        include: [GetSpacesByUserSelectDocument, GetSpacesByUserDocument]
      })
    }
  })
}

export const useUpdateSpace = () => {
  const queryClient = useQueryClient()
  const apolloClient = useApolloClient() //Get Apollo client if you need to refetch GraphQL

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpaceDto }) => spaceApi.update(id, data),
    onSuccess: (_updatedSpace) => {
      queryClient.invalidateQueries({ queryKey: SPACE_KEY_FACTORY.lists() })

      // Optional: Refetch GraphQL query by document type
      apolloClient.refetchQueries({
        include: [GetSpacesByUserSelectDocument, GetSpacesByUserDocument]
      })
    }
  })
}

export const useDeleteSpace = () => {
  const queryClient = useQueryClient()
  const apolloClient = useApolloClient() //Get Apollo client if you need to refetch GraphQL

  return useMutation({
    mutationFn: (id: string) => spaceApi.delete(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: SPACE_KEY_FACTORY.lists() })

      // Optional: Refetch GraphQL query by document type
      apolloClient.refetchQueries({
        include: [GetSpacesByUserSelectDocument, GetSpacesByUserDocument]
      })
    }
  })
}
