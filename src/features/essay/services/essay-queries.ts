import { gql } from '@apollo/client'

export const CREATE_CORRECTION_MUTATION = gql`
  mutation CreateCorrectionEssay($input: CreateCorrectionDto!) {
    createCorrectionEssay(input: $input) {
      id
      essayId
      createdBy
      createdAt
      overallComment
      rating
      updatedAt
      sentences {
        id
        correctionId
        originalText
        correctedText
        explanation
        isCorrect
        rating
        updatedAt
        createdAt
      }
      creator {
        id
        username
        email
        role
        authProvider
        authProviderId
        firstName
        lastName
        profilePicture
        isEmailVerified
        lastLogin
        createdAt
        updatedAt
      }
    }
  }
`

export const UPDATE_CORRECTION_MUTATION = gql`
  mutation UpdateCorrectionEssay($input: UpdateCorrectionDto!) {
    updateCorrectionEssay(input: $input) {
      id
      essayId
      createdBy
      overallComment
      rating
      createdAt
      updatedAt
      sentences {
        id
        correctionId
        originalText
        correctedText
        explanation
        isCorrect
        rating
        createdAt
        updatedAt
      }
    }
  }
`

export const GET_LIST_CORRECTION_BY_ESSAY_QUERY = gql`
  query GetCorrectionsByEssay($input: GetCorrectionsByEssayDto!) {
    getCorrectionsByEssay(input: $input) {
      data {
        id
        essayId
        createdBy
        overallComment
        rating
        createdAt
        updatedAt
        creator {
          id
          username
          nativeLanguage
          email
          role
          authProvider
          authProviderId
          firstName
          lastName
          profilePicture
          isEmailVerified
          lastLogin
          createdAt
          updatedAt
        }
        sentences {
          id
          correctionId
          index
          originalText
          correctedText
          explanation
          isCorrect
          rating
          createdAt
          updatedAt
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

export const CHECK_CORRECTION_EXIST_QUERY = gql`
  query GetCorrectionIfExist($essayId: String!) {
    getCorrectionIfExist(essayId: $essayId) {
      id # Thêm id vào đây
      essayId
      createdBy
      overallComment
      rating
      createdAt
      updatedAt
      sentences {
        id
        correctionId
        index
        originalText
        correctedText
        explanation
        isCorrect
        rating
        createdAt
        updatedAt
      }
    }
  }
`
