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
        createdAt
        updatedAt
        _count {
          essays
          notes
          vocabularies
        }
      }
      pagination {
        totalItems
        currentPage
        totalPages
        itemsPerPage
        hasNextPage
        hasPreviousPage
      }
    }
  }
`
