import { gql } from '@apollo/client'

export const GET_SPACES_BY_USER_SELECT = gql`
  query GetSpacesByUserSelect($input: GetUserSpacesDto!) {
    getUserSpaces(input: $input) {
      data {
        id
        name
        description
      }
    }
  }
`

export const GET_SPACES_BY_USER = gql`
  query GetSpacesByUser($input: GetUserSpacesDto!) {
    getUserSpaces(input: $input) {
      data {
        id
        name
        description
        created_at
        updated_at
        _count {
          essays
          quizzes
          vocabularies
        }
      }
      pagination {
        totalItems
        itemsPerPage
        totalPages
        currentPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`
